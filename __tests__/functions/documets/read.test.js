"use strict";

import handler from '../../../src/functions/documents/read';
import dynamo from '../../../src/modules/dynamo';

const fakeResult = JSON.stringify(
    {
        Items:
            [
                {
                    name: "Document 1",
                    description: "This is the mocked document",
                    created_at: "2023-03-10T22:47:04.659Z",
                    id: "1d37aafc-b777-4aff-9598-b999597b3a10"
                }
            ],
        Count: 1,
        ScannedCount: 1
    }
);

jest.spyOn(dynamo, 'scan').mockReturnValue(fakeResult);

describe('read documents in handler', () => {

    test('document read handler calls scan dynamo client', async () => {

        await handler();

        expect(dynamo.scan).toHaveBeenCalled();

    });

    test('document read handler gives valid result', async () => {

        const result = await handler();

        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(JSON.stringify(fakeResult));

    });

});


