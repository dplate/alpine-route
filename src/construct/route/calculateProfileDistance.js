export default (point1, point2) =>
  Math.sqrt(
    (point1.flatMeter - point2.flatMeter) ** 2 + (point1.z - point2.z) ** 2,
  );
