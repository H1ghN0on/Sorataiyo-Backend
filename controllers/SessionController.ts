import express from "express";

const { Session, Application, RecordsResult } = require("../models");

export type SessionType = {
  startTimestamp: string;
  endTimestamp: string;
};

interface IGetResultsForUserResult {
  status: boolean;
  applications?: any;
}

interface IGetSessionResult {
  status: boolean;
  session?: any;
  name?: string;
}

export const createSession = async (applicationId: number) => {
  try {
    const session = await Session.create({
      startTimestamp: new Date(Date.now()).toISOString(),
      endTimestamp: new Date(Date.now()).toISOString(),
      applicationId,
    });
    if (session) {
      return { status: true, session };
    }
    return { status: false };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const endSession = async (applicationId: number) => {
  try {
    await Session.update(
      {
        endTimestamp: new Date(Date.now()).toISOString(),
      },
      { where: { applicationId: applicationId } }
    );
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

class SessionController {
  async getUserSessions(req: express.Request, res: express.Response) {
    try {
      const userId = req.user!.data.id!;
      const applications = await Application.findAll({
        where: {
          userId: userId,
          status: "completed",
        },
        include: {
          model: Session,
        },
      });
      if (!applications) {
        const result: IGetResultsForUserResult = { status: false };
        return res.send(result);
      }
      const result: IGetResultsForUserResult = { status: true, applications };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IGetResultsForUserResult = { status: false };
      return res.send(result);
    }
  }

  async getSessionResults(req: express.Request, res: express.Response) {
    try {
      const sessionId = +req.params.id;
      const session = await Session.findOne({
        where: {
          id: sessionId,
        },
        include: {
          model: RecordsResult,
        },
      });

      if (!session) {
        const result: IGetSessionResult = { status: false };
        return res.send(result);
      }
      const application = await Application.findOne({
        where: {
          id: session.applicationId,
        },
      });
      if (!application) {
        const result: IGetSessionResult = { status: false };
        return res.send(result);
      }
      const result: IGetSessionResult = { status: true, session, name: application.name };
      res.send(result);
    } catch (error) {
      console.log(error);
      const result: IGetSessionResult = { status: false };
      return res.send(result);
    }
  }
}

export default new SessionController();
