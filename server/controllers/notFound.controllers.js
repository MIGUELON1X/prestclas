export const notFound = (req, res) => {
  res.status(404).json({ message: "Página no encontrada" });
};
