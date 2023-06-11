import express from "express";

const { Instrument, Application } = require("../models");

enum ApplicationStatus {
  Rejected = "rejected",
  Accepted = "accepted",
  Completed = "completed",
  Pending = "pending",
}

export type InstrumentType = {
  name: string;
};

export type ApplicationType = {
  x: number;
  y: number;
  radius: number;
  instrument: number;
  status: ApplicationStatus;
  user: number;
  name: string;
};

interface IGetInstrumentsResult {
  status: boolean;
  instruments: InstrumentType[];
}

interface ICreateApplicationResult {
  status: boolean;
  message?: string;
  applicaiton?: ApplicationType;
}

const addApplication = async (_application: ApplicationType) => {
  try {
    const application = await Application.create({
      name: _application.name,
      x: _application.x,
      y: _application.y,
      radius: _application.y,
      status: _application.status,
      user_id: _application.user,
      instrument_id: _application.instrument,
    });
    if (!application)
      return {
        status: false,
        message: "Application hasn't been added",
      };
    return {
      status: true,
      application,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "DB error occured",
    };
  }
};

class ApplictaionController {
  async getInstruments(req: express.Request, res: express.Response) {
    try {
      const instruments = await Instrument.findAll();
      const result: IGetInstrumentsResult = {
        status: true,
        instruments,
      };
      res.send(result);
    } catch (e) {
      console.log(e);
      const result: IGetInstrumentsResult = {
        status: false,
        instruments: [],
      };
      res.send(result);
    }
  }

  async createApplication(req: express.Request, res: express.Response) {
    try {
      const { instrument, name, x, y, radius, status } = req.body;
      const applicationResult: ICreateApplicationResult = await addApplication({
        instrument,
        name,
        x,
        y,
        radius,
        user: req.user!.data.id!,
        status: status,
      });

      res.send(applicationResult);
    } catch (error) {
      console.log(error);
      const result: ICreateApplicationResult = { status: false, message: "DB problem occured" };
      res.send(result);
    }
  }
}

export default new ApplictaionController();
