export const stripe = {
    charges: {
        // returns promise that automatically resolves itself
        create: jest.fn().mockResolvedValue({}),
    },
};