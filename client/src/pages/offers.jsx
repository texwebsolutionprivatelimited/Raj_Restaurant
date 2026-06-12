import { useCoupons } from "../hooks/useCoupons";

export default function Offers() {
  const coupons = useCoupons();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-5">🔥 Best Offers for You</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {coupons.map((c) => (
          <div
            key={c._id}
            className="bg-zinc-900 border border-white/10 p-4 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-green-400 text-xl font-bold">
                {c.code}
              </h2>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(c.code);
                  alert("Copied!");
                }}
                className="text-sm bg-indigo-500 px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>

            <p className="mt-2 text-lg">🎁 {c.discount}</p>

            {c.minOrder && (
              <p className="text-sm text-zinc-400">
                Min Order: ₹{c.minOrder}
              </p>
            )}

            <p className="text-sm text-zinc-500 mt-2">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}