export const drawOrderLine = ({
  orderPriceValue,
  ctx,
  u,
}: {
  orderPriceValue: number;
  ctx: CanvasRenderingContext2D;
  u: uPlot;
}) => {
  const orderPriceY = u.valToPos(orderPriceValue, 'y');

  ctx.save();
  ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(u.bbox.left, orderPriceY);
  ctx.lineTo(u.bbox.left + u.bbox.width, orderPriceY);
  ctx.stroke();

  // Add order price label
  ctx.fillStyle = 'rgba(255, 165, 0, 1)';
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(
    // `Order: ${orderPriceValue.toFixed(10)}`,
    `Order: ${orderPriceValue}`,
    u.bbox.left + 5,
    orderPriceY - 5,
  );
  ctx.restore();
};
