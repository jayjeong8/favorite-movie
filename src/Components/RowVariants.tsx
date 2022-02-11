
export const rowVariants = {
    hidden: {
        x: window.outerWidth
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth
    }
};
export const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
        y: -80,
        transition: {
            delay: 0.4,
            duration: 0.3,
            type: "tween",
        }
    },
};
export const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.3,
            type: "tween",
        }
    },
};