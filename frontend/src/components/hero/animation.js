export const slideUp = {
    initial: {
        y: 300,
        opacity: 0
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.8,
            staggerChildren: 0.2
        }
    }
}

export const opacity = {
    initial: {
        opacity: 0,
        y: 60
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}