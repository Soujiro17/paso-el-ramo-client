/* eslint-disable import/no-unresolved */
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";
import useCollections from "../../hooks/useCollections";
import ColeccionItem from "../ColeccionItem";

const swiperBreakpoints = {
  520: {
    slidesPerView: 1.7,
  },
  650: {
    slidesPerView: 2.5,
  },
  1000: {
    slidesPerView: 3.3,
  },
};

function AddCollectionCard({ addCollection }) {
  return (
    <Box
      key={0}
      height="150px"
      maxWidth="300px"
      width="100%"
      minHeight="150px"
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

  const swiper = useRef(null);

  useEffect(() => {
    if (swiper.current) {
      const handleResize = () => {
        if (window.innerWidth < 520) {
          swiper.current.swiper.slideNext();
        }
      };

      handleResize();
    }
  }, [swiper.current, selectedCollection]);

  return (
    <Swiper
      ref={swiper}
      className="swiper-cont"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={swiperBreakpoints}
    >
      <SwiperSlide>
        <AddCollectionCard addCollection={addCollection} />
      </SwiperSlide>
      {colecciones.map((coleccion) => {
        const isEqual = coleccion.id === selectedCollection?.id;

        return (
          <SwiperSlide key={coleccion.id} data-is-selected={isEqual}>
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
    </Swiper>
  );
}

export default Colecciones;
