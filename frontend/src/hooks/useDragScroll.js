import { useCallback, useEffect, useState } from 'react';


export const useDragScroll = () => {    
    
    const [node, setNode] = useState(null);

    const ref = useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);
    
    const checkScrollEnd = useCallback(() => {
        if (!node) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = node;
        const isAtStart = scrollLeft <= 0;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth;

        // 가로 스크롤이 시작/끝에 도달하면 세로 스크롤 허용
        node.style.overflowY = (isAtStart || isAtEnd) ? 'auto' : 'hidden';
    }, [node]);

    const handleMouseDown = useCallback((e) => {
        if (!node) return;
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
            checkScrollEnd(); 
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(node);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [node, checkScrollEnd]);
    
    
    const handleWheel = useCallback((e) => {
        if (!node) return;
        
        // 가로 스크롤만 처리
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            node.scrollLeft += e.deltaY;
            checkScrollEnd();
        }
    }, [node, checkScrollEnd]);

    
    const handleTouchStart = useCallback((e) => {
        if (!node) {
            return;
        }
        const touch = e.touches[0];
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: touch.clientX,
            y: touch.clientY,
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
            checkScrollEnd(); 
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(node);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [node, checkScrollEnd]);

    const updateCursor = (ele) => {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
    };

    const resetCursor = (ele) => {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    useEffect(() => {
        if (!node) {
            return;
        }
        node.addEventListener("mousedown", handleMouseDown);
        node.addEventListener("touchstart", handleTouchStart);
        node.addEventListener('wheel', handleWheel, { passive: false });
        node.addEventListener('scroll', checkScrollEnd);    
        return () => {
            node.removeEventListener("mousedown", handleMouseDown);
            node.removeEventListener("touchstart", handleTouchStart);
            node.removeEventListener('wheel', handleWheel);
            node.removeEventListener('scroll', checkScrollEnd);
        };
    }, [node, handleMouseDown,handleTouchStart, handleWheel, checkScrollEnd]);

    return [ref];
};