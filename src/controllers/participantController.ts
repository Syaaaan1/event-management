import { Request, Response } from 'express';
import { Participant } from '../models/Participants';
import { Event } from '../models/Event';
import { User } from '../models/User';

interface ParticipantWithEvent extends Participant {
    event: Event;
}

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const registerParticipant = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { eventId } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const event = await Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const existingParticipant = await Participant.findOne({
            where: { eventId, userId },
        });

        if (existingParticipant) {
            res.status(400).json({ message: "User already registered for this event" });
            return;
        }

        const registeredParticipantsCount = await Participant.count({ where: { eventId } });
        if (registeredParticipantsCount >= event.maxParticipants) {
            res.status(400).json({ message: "Event is full" });
            return;
        }

        const participant = await Participant.create({ eventId, userId });
        res.status(201).json(participant);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRegisteredEventsForUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const participants = await Participant.findAll({
            where: { userId },
            include: [{ model: Event, as: 'event' }],
        });

        const events = (participants as ParticipantWithEvent[]).map((participant) => participant.event);
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};