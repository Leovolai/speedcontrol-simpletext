// animations.js

window.animateCameraTags = function (mutateDOM, duration = 500) {
    const tags = Array.from(document.querySelectorAll('#camera .tag'));

    if (!tags.length) {
        mutateDOM();
        return;
    }

    // FIRST
    const first = tags.map(tag => tag.getBoundingClientRect());

    // MUTATE
    mutateDOM();

    // Force layout so LAST is correct
    tags[0].offsetWidth;

    // LAST
    const last = tags.map(tag => tag.getBoundingClientRect());

    // PLAY
    tags.forEach((tag, i) => {
        const dx = first[i].left - last[i].left;
        const dy = first[i].top - last[i].top;
        const sx = first[i].width / last[i].width;

        // Cancel any running animation (important for frequent updates)
        tag.getAnimations().forEach(a => a.cancel());

        tag.animate(
            [
                {
                    transform: `translate(${dx}px, ${dy}px) scaleX(${sx})`
                },
                {
                    transform: 'none'
                }
            ],
            {
                duration,
                easing: 'ease-out'
            }
        );
    });
};
