// fake implementation based on base-publisher class in common module
export const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: () => void) => {
                callback();
            }
        ),
    },
};