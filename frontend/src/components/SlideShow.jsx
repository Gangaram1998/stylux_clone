import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";
import {
    IoIosArrowDroprightCircle,
    IoIosArrowDropleftCircle,
} from "react-icons/io";

function NextArrow(props) {
    // console.log(props)
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <IoIosArrowDroprightCircle
                style={{
                    ...style,
                    fontSize: "30px",
                    display: "block",
                    color: "grey",
                    borderRadius: "50%",
                    position: "relative",
                    bottom: "22px",
                    right: "5px",
                }}
            />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <IoIosArrowDropleftCircle
                style={{
                    ...style,
                    fontSize: "30px",
                    display: "block",
                    color: "grey",
                    borderRadius: "50%",
                    position: "relative",
                    right: "3px",
                    bottom: "22px",
                }}
            />
        </div>
    );
}

export default class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    play() {
        this.slider.slickPlay();
    }
    pause() {
        this.slider.slickPause();
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        return (
            <Box w={"80%"} h="90%" m={"auto"}>
                <Slider ref={(slider) => (this.slider = slider)} {...settings}>
                    <Box w={"100%"}>
                        <Image src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677399356/samples/styluxe/women_footwear06022018_nvtv70.jpg" transition={"transform 2s"}
                            _hover={{ transform: "scale(1.1)" }} />
                    </Box>
                    <Box w={"100%"}>
                        <Image src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677401244/samples/styluxe/women_winterwear_30012018_wrfc5f.jpg" transition={"transform 2s"}
                            _hover={{ transform: "scale(1.1)" }} />
                    </Box>
                    <Box w={"100%"}>
                        <Image src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677401268/samples/styluxe/high_performance_shoes_dlh5go.jpg" transition={"transform 2s"}
                            _hover={{ transform: "scale(1.1)" }} />
                    </Box>
                    <Box w={"100%"}>
                        <Image src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677401286/samples/styluxe/menwomen_ethinic_wear_9022018_bjkbfb.jpg" transition={"transform 2s"}
                            _hover={{ transform: "scale(1.1)" }} />
                    </Box>

                </Slider>
            </Box>
        );
    }
}