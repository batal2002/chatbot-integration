import { TouchEvent, useRef } from 'react';

interface SwipeProps {
    onSwipedTop?: () => void;
    onSwipedBottom?: () => void;
    onSwipedLeft?: () => void;
    onSwipedRight?: () => void;
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: () => void;
}

export const useSwipe = ({
    onSwipedBottom,
    onSwipedTop,
    onSwipedRight,
    onSwipedLeft,
}: SwipeProps): SwipeOutput => {
    const touchStartY = useRef<number>(0);
    const touchEndY = useRef<number>(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const minSwipeDistance = 50;
    const maxDiagonalDistance = 75;

    const onTouchStart = (e: TouchEvent) => {
        touchEndX.current = 0;
        touchEndY.current = 0;
        touchStartY.current = e.targetTouches[0].clientY;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
        touchEndY.current = e.targetTouches[0].clientY;
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        const distanceY = touchStartY.current - touchEndY.current;
        const distanceX = touchStartX.current - touchEndX.current;

        const isTopSwipe = distanceY > minSwipeDistance;
        const isBottomSwipe = distanceY < -minSwipeDistance;
        const isLeftSwipe =
            distanceX > minSwipeDistance &&
            distanceY < maxDiagonalDistance &&
            distanceY > -maxDiagonalDistance;
        const isRightSwipe =
            distanceX < -minSwipeDistance &&
            distanceY < maxDiagonalDistance &&
            distanceY > -maxDiagonalDistance;

        if (isTopSwipe && onSwipedTop) {
            onSwipedTop();
        }
        if (isBottomSwipe && onSwipedBottom) {
            onSwipedBottom();
        }

        if (isLeftSwipe && onSwipedLeft) {
            onSwipedLeft();
        }
        if (isRightSwipe && onSwipedRight) {
            onSwipedRight();
        }
    };

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
};
