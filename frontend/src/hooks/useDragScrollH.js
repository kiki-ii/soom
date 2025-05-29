import { useCallback, useEffect, useState } from 'react';


export const useDragScrollH = () => {    
    
    const [node, setNode] = useState(null);

    const ref = useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);

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
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(node);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [node]);
    
    
    const handleWheel = useCallback((e) => {
        if (!node) return;
        
        // 가로 스크롤만 처리
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        node.scrollLeft += e.deltaY;
        }
    }, [node]);

    
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
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(node);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [node]);

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
        return () => {
            node.removeEventListener("mousedown", handleMouseDown);
            node.removeEventListener("touchstart", handleTouchStart);
            node.removeEventListener('wheel', handleWheel);
        };
    }, [node, handleMouseDown,handleTouchStart, handleWheel]);

    return [ref];
};