import request from 'supertest';
import { app } from '../../app';

// helper fucntion - creates tickets
const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'jjfijdfij',
            price: 20
        });
};

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();


    //expect to get 3 ticket objects
    const reponse = await request(app).get('/api/tickets').send().expect(200);

    expect(reponse.body.length).toEqual(3);

});