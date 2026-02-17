export default async (req) => {
    try {
        const res = await fetch(
            'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=PLN'
        );
        const data = await res.json();

        if (!data.PLN) {
            return new Response(JSON.stringify({ error: 'Brak danych' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ PLN: data.PLN }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60'
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: '/api/ltc-rate'
};
