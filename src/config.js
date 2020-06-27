export const staggerAnimation = {
    container: {
        initial: 'hidden',
        animate: 'visible',
        variants: {
            visible: {
                transition: {
                    staggerChildren: .2,
                }
            },
        }
    },
    child: {
        variants: {
            hidden: {
                opacity: 0,
                y: 10,
            },
            visible: {
                opacity: 1,
                y: 0,
            },
        },
    }
}

export const pageAnimation = {
    initial: { x: 200 },
    animate: { x: 0 }
}