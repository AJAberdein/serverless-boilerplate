"use strict";

import handler  from '../../../src/functions/documents/create';
import dynamo from '../../../src/modules/dynamo';
import aws from 'aws-sdk';

jest.mock('../../../src/modules/dynamo', () => ({
    put: jest.fn(),
}));

const mockedUuid = "e208634d-5e1e-487b-8fcb-7d7e89efe905";
const mockedDateISO = "2023-03-17T11:00:00.000Z";
const mockedName = "Document 1"
const mockedDescription = "This is the mocked document"

const document = {
    id: mockedUuid,
    name: mockedName,
    description: mockedDescription,
    createdAt: mockedDateISO,
    updatedAt: mockedDateISO
}

const eventInput = {
    body: JSON.stringify({
        name: mockedName,
        description: mockedDescription,
    })
}

const fakeResult = {}

jest.spyOn(aws.util.uuid, 'v4').mockReturnValue(mockedUuid);
jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockedDateISO);

describe('create document in lambda handler', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('document create handler calls put to dynamo client', async () => {

        await handler(eventInput);

        expect(dynamo.put).toHaveBeenCalled();
        expect(dynamo.put).toHaveBeenCalledWith(document, 'documents');
        
    });

    test('document create handler gives valid success result', async () => {

        dynamo.put.mockResolvedValue(fakeResult);
        const result = await handler(eventInput);
        
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(JSON.stringify(fakeResult));

    });

});



