import Link from 'next/link';

export default function PricingTable() {
  const plans = [
    { name: "Básico", price: "10€", credits: 10, stripeId: process.env.NEXT_PUBLIC_PRICE_BASIC },
    { name: "Pro", price: "5€", credits: 5, stripeId: process.env.NEXT_PUBLIC_PRICE_PRO },
    { name: "Ultra", price: "2€", credits: 2, stripeId: process.env.NEXT_PUBLIC_PRICE_ULTRA },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {plans.map((plan, i) => (
        <div key={i} className="card text-center">
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <p className="text-4xl font-bold text-primary mb-2">{plan.price}</p>
          <p className="opacity-70 mb-4">{plan.credits} créditos</p>
          <Link
            href={"/checkout?price=" + plan.stripeId}
            className="btn-primary block text-center"
          >
            Comprar
          </Link>
        </div>
      ))}
    </div>
  );
}
