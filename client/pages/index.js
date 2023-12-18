const Landing = ({ currentUser, tickets }) => {
    const ticketList = tickets.map(ticket => {
        return (
            <tr key={tickets.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
            </tr>
        );
    });

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    );
};

// get extra data before rendering up webpage - used when SSR
// information fetching for individual pages
Landing.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default Landing;