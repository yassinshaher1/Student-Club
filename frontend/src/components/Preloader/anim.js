export const opacity = {
    initial: {
        opacity: 0,
        scale: 0.8
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1]
        }
    },
}

export const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0}
    }
}