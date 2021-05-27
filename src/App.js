import React, { useEffect, useState } from "react";
import { Image, Transformation } from "cloudinary-react";
var Airtable = require("airtable");

var base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

function App() {
  const [cakes, setCakes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("Butter Cake");

  const myWidget = window.cloudinary.galleryWidget({
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    mediaAssets: [{ tag: currentProduct }],
    secure: true,
    aspectRatio: "16:9",
    container: "#my-gallery",
  });
  myWidget.render();

  const openGallery = (selectedProduct) => {
    setCurrentProduct(selectedProduct);
    myWidget.update({ mediaAssets: [{ tag: currentProduct }] });
    setShowModal(true);
  };

  const closeGalllery = () => {
    myWidget.destroy();
    setShowModal(false);
  };
  useEffect(() => {
    base("cakes")
      .select({
        view: "Grid view",
      })
      .firstPage((err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        setCakes(records);
      });
  }, []);

  return (
    <div className="bg-pink-100 min-h-screen">
      <div className="container px-3  mx-auto">
        <h1 className=" text-5xl font-title md:text-7xl text-red-800 px-4 pt-2 leading-normal mb-2">
          Sweet Tooth
        </h1>
        <div className="container flex flex-wrap -mx-2 px-4 overflow-hidden">
          {cakes.length > 0 &&
            cakes.map((cake) => (
              <div
                className="my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-4xl"
                key={cake.fields.id}
              >
                <Image
                  className="rounded-t-xl"
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                  publicId={cake.fields.public_id}
                  format="webp"
                  secure="true"
                >
                  <Transformation quality="60" />
                </Image>
                <div className="-mt-1 rounded-b-xl bg-white px-4 py-3">
                  <div className="px-1">
                    <button
                      className="text-4xl text-gray-600 font-medium font-product-title underline hover:text-pink-600"
                      onClick={() => openGallery(cake.fields.name)}
                    >
                      {cake.fields.name}
                    </button>{" "}
                    <p className="text-md py-4 font-product-description leading-6 overflow-ellipsis text-gray-600">
                      {cake.fields.description}
                    </p>
                  </div>

                  <div className="px-6 py-3">
                    <p className="text-3xl inline-block font-product-price px-2 text-gray-800">
                      {cake.fields.price}$
                    </p>

                    <button
                      className="snipcart-add-item text-white float-right flex flex-auto justify-center items-center uppercase text-md px-2 bg-green-400 hover:bg-green-500  w-36  h-12 border-transparent font-medium rounded-3xl"
                      data-item-id={cake.fields.id}
                      data-item-price={cake.fields.price}
                      data-item-url="/"
                      data-item-description={cake.fields.description}
                      data-item-image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/q_10/${cake.fields.public_id}`}
                      data-item-name={cake.fields.name}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      buy now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="absolute w-4/6 my-8 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl text-pink-800 font-medium">
                      {currentProduct} Gallery
                    </h3>

                    <button
                      className="p-1 bg-transparent ml-auto border-0 text-red-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        closeGalllery();
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="p-4" id="my-gallery"></div>
                  <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        closeGalllery();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
