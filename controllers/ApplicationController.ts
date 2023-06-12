import express from "express";
import { Op } from "sequelize";
import { createSession, endSession } from "./SessionController";
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
  id: number;
  x: number;
  y: number;
  radius: number;
  instrument: number;
  status: ApplicationStatus;
  user: number;
  name: string;
};

export type ApplicationViewType = {
  x: number;
  y: number;
  radius: number;
  instrument: string;
  status: string;
  user: string;
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

interface IGetApplicationsResult {
  status: boolean;
  applications: ApplicationViewType[];
}

interface IGetApplicationByIdResult {
  status: boolean;
  application?: ApplicationViewType;
}

interface IUpdateApplicationResult {
  status: boolean;
}

interface IDeleteApplicationResult {
  status: boolean;
}

const addApplication = async (_application: ApplicationType) => {
  try {
    const application = await Application.create({
      name: _application.name,
      x: _application.x,
      y: _application.y,
      radius: _application.y,
      status: _application.status,
      userId: _application.user,
      instrumentId: _application.instrument,
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

const updateApplication = async (_application: ApplicationType) => {
  try {
    const application = await Application.update(
      {
        name: _application.name,
        x: _application.x,
        y: _application.y,
        radius: _application.y,
        status: _application.status,
        userId: _application.user,
        instrumentId: _application.instrument,
      },
      {
        where: {
          id: _application.id,
        },
      }
    );
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

class ApplicationController {
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
        id: -1,
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

  async getApplications(req: express.Request, res: express.Response) {
    try {
      const applications = await Application.findAll({ where: { userId: req.user!.data.id } });
      const result: IGetApplicationsResult = { status: true, applications };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IGetApplicationsResult = { status: false, applications: [] };
      res.send(result);
    }
  }

  async getAdminApplications(req: express.Request, res: express.Response) {
    try {
      const applications = await Application.findAll({
        where: { status: { [Op.or]: ["pending", "accepted"] } },
      });
      const result: IGetApplicationsResult = { status: true, applications };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IGetApplicationsResult = { status: false, applications: [] };
      res.send(result);
    }
  }

  async getApplicationById(req: express.Request, res: express.Response) {
    try {
      const application = await Application.findOne({
        where: { id: req.params.id },
        include: Instrument,
      });
      if (!application) {
        const result: IGetApplicationByIdResult = { status: false };
        return res.send(result);
      }
      const result: IGetApplicationByIdResult = { status: true, application };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IGetApplicationByIdResult = { status: false };
      res.send(result);
    }
  }

  async updateApplicationStatus(req: express.Request, res: express.Response) {
    try {
      const { id, review, status } = req.body;
      const application = await Application.update(
        {
          status,
          review,
        },
        {
          where: { id: id },
        }
      );
      if (!application) {
        const result: IUpdateApplicationResult = { status: false };
        return res.send(result);
      }
      if (status === "accepted") {
        const sessionResult = await createSession(id);
        if (!sessionResult.status) {
          const result: IUpdateApplicationResult = { status: false };
          return res.send(result);
        }
      }
      const result: IUpdateApplicationResult = { status: true };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IUpdateApplicationResult = { status: false };
      res.send(result);
    }
  }

  async updateApplication(req: express.Request, res: express.Response) {
    try {
      const { id, instrument, name, x, y, radius, status } = req.body;
      const applicationResult: IUpdateApplicationResult = await updateApplication({
        id,
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
      const result: IUpdateApplicationResult = { status: false };
      res.send(result);
    }
  }

  async completeApplication(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const application = await Application.update(
        {
          status: "completed",
        },
        {
          where: { id: +id },
        }
      );
      if (!application) {
        const result: IUpdateApplicationResult = { status: false };
        return res.send(result);
      }

      const sessionResult = await endSession(+id);
      if (!sessionResult.status) {
        const result: IUpdateApplicationResult = { status: false };
        return res.send(result);
      }
      const result: IUpdateApplicationResult = { status: true };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IUpdateApplicationResult = { status: false };
      res.send(result);
    }
  }

  async deleteApplication(req: express.Request, res: express.Response) {
    try {
      await Application.destroy({ where: { id: req.params.id } });
      const deleteResult: IDeleteApplicationResult = { status: true };
      res.send(deleteResult);
    } catch (error) {
      console.log(error);
      const result: IDeleteApplicationResult = { status: false };
      res.send(result);
    }
  }
}

export default new ApplicationController();
