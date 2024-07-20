/* eslint-disable import/no-unresolved */
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCollections from "../../hooks/useCollections";
import ColeccionItem from "../ColeccionItem";

const swiperBreakpoints = {
  520: {
    slidesPerView: 1.7,
  },
  650: {
    slidesPerView: 2,
  },
  800: {
    slidesPerView: 2.5,
  },
  1000: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 3.5,
  },
  1400: {
    slidesPerView: 4,
  },
  1600: {
    slidesPerView: 4.5,
  },
  1800: {
    slidesPerView: 5,
  },
};

function AddCollectionCard({ addCollection }) {
  return (
    <Box
      key={0}
      height="150px"
      width="300px"
      minHeight="150px"
      minWidth="300px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={addCollection}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="6xl"
      textAlign="center"
      bg={useColorModeValue("gray.100", "gray.1000")}
      className="coleccion-item"
    >
      <Stack>
        <span>+</span>
        <Text margin="0" fontSize="initial">
          Nueva colección
        </Text>
      </Stack>
    </Box>
  );
}

function Colecciones() {
  const {
    colecciones,
    mutateRemoveCollection,
    addCollection,
    selectCollection,
    selectedCollection,
  } = useCollections();

  return (
    <Swiper
      className="swiper-cont"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1.2}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={swiperBreakpoints}
    >
      <SwiperSlide id="slide-add-collection-first">
        <AddCollectionCard addCollection={addCollection} />
      </SwiperSlide>
      {colecciones.map((coleccion) => {
        const isEqual = coleccion.id === selectedCollection?.id;

        return (
          <SwiperSlide key={coleccion.id}>
            <ColeccionItem
              id={coleccion.id}
              onClick={() => selectCollection(isEqual ? null : coleccion.id)}
              nombre={coleccion.nombre || "Colección sin nombre *"}
              bgColor={coleccion.bgColor}
              deleteColeccion={() =>
                mutateRemoveCollection({
                  id: coleccion.id,
                  synced: coleccion.synced,
                })
              }
              editing={isEqual}
            />
          </SwiperSlide>
        );
      })}
      <SwiperSlide id="slide-add-collection-last">
        <AddCollectionCard addCollection={addCollection} />
      </SwiperSlide>
    </Swiper>
  );
}

export default Colecciones;
