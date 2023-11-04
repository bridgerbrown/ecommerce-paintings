import paintingsMetaDeta from "./paintingsMetadata.json";

export default function productData(painting, id, productsStock) {
  const title = painting.label;
  const artist = painting.metadata[0].value.match(/^.*?(?=\n)/); 
  const jsonId = painting["@id"].match(/\/artworks\/(\d+)\/manifest\.json/)[1];
  const metaDataIndex = paintingsMetaDeta.findIndex((painting) => painting.id === Number(jsonId));
  const imgPath = paintingsMetaDeta[metaDataIndex].title;
  const product = {
    id: id,
    title: title,
    img: `/painting-images/${imgPath}.webp`,
    link: painting.rendering["@id"],
    description: painting.description[0].value,
    medium: painting.metadata[1].value,
    artist: artist,
    price: paintingsMetaDeta[metaDataIndex].price,
    stock: productsStock,
    route: `${artist}/${title}`,
    fsid: paintingsMetaDeta[metaDataIndex].fsid,
    width: paintingsMetaDeta[metaDataIndex].width,
    height: paintingsMetaDeta[metaDataIndex].height,
  };
  return product;
};
