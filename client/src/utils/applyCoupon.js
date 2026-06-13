export const getBestCoupon = (coupons, total) => {
  let best = null;
  let maxDiscount = 0;

  coupons.forEach((c) => {
    const discount = parseInt(c.discount); // "10%" → 10

    if (!discount) return;

    if (total >= (c.minOrder || 0)) {
      const value = (total * discount) / 100;

      if (value > maxDiscount) {
        maxDiscount = value;
        best = c;
      }
    }
  });

  return { best, maxDiscount };
};