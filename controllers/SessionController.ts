import express from "express";

const { Session } = require("../models");

export type SessionType = {
  startTimestamp: string;
  endTimestamp: string;
};

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

class SessionController {}

export default new SessionController();
