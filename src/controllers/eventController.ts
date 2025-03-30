import { Request, Response } from "express";
import { Event } from "../models/Event";

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, date, location, maxParticipants } = req.body;
        const event = await Event.create({ title, description, date, location, maxParticipants });
        res.status(201).json(event);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
        return;
    }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await Event.findAll();
        res.json(events);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
        return;
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        res.json(event);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
        return;
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, date, location, maxParticipants } = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        await event.update({ title, description, date, location, maxParticipants });
        res.json(event);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
        return;
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        await event.destroy();
        res.json({ message: "Event deleted successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
        return;
    }
};
