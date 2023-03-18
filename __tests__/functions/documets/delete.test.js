"use strict";

import handler from "../../../src/functions/documents/delete";
import dynamo from "../../../src/modules/dynamo";

jest.mock("../../../src/modules/dynamo", () => ({
  delete: jest.fn(),
}));

const mockedUuid = "e208634d-5e1e-487b-8fcb-7d7e89efe905";
const mockedDateISO = "2023-03-17T11:00:00.000Z";
const mockedName = "Document 1";
const mockedDescription = "This is the mocked document";

const eventInput = {
  pathParameters: {
    id: mockedUuid,
  },
  body: JSON.stringify({
    name: mockedName,
    description: mockedDescription,
  }),
};

const fakeResult = JSON.stringify({
  Attributes: {
    id: mockedUuid,
    name: mockedName,
    created_at: mockedDateISO,
    description: mockedDescription,
    updatedAt: mockedDateISO,
  },
});

jest.spyOn(Date.prototype, "toISOString").mockReturnValue(mockedDateISO);

jest.mock("@middy/core", () => {
  return (handler) => {
    return {
      use: jest.fn().mockReturnValue(handler),
    };
  };
});

describe("update document in lambda handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("document update handler calls update to dynamo client", async () => {
    await handler(eventInput);

    expect(dynamo.delete).toHaveBeenCalled();
    expect(dynamo.delete).toHaveBeenCalledWith(mockedUuid, "documents");
  });

  test("document udpate handler gives valid success result", async () => {
    dynamo.delete.mockResolvedValue(fakeResult);
    const result = await handler(eventInput);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(fakeResult));
  });
});
