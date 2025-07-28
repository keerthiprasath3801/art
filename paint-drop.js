document.addEventListener('DOMContentLoaded', function() {
    // Initialize paint drops system
    initPaintDrops();
});

function initPaintDrops() {
    // Remove existing container if it exists
    const existingContainer = document.getElementById('paint-drops-container');
    if (existingContainer) {
        existingContainer.innerHTML = '';
    } else {
        // Create container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'paint-drops-container';
        document.body.insertBefore(container, document.body.firstChild);
    }
    
    // Start the paint drops effect
    startPaintEffect();
}

function startPaintEffect() {
    const container = document.getElementById('paint-drops-container');
    const colors = [
        'rgba(142, 68, 173, 0.6)',  // primary purple
        'rgba(52, 152, 219, 0.6)',   // secondary blue
        'rgba(241, 196, 15, 0.6)',   // eagle gold
        'rgba(231, 76, 60, 0.6)',    // accent red
        'rgba(46, 204, 113, 0.6)'    // green
    ];

    // Create initial batch of drops
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createPaintDrop(container, colors), i * 800);
    }
    
    // Continue creating drops at intervals
    const dropInterval = setInterval(() => {
        if (!document.hidden) {
            createPaintDrop(container, colors);
        }
    }, 3000);
    
    // Cleanup on page navigation (for SPAs)
    window.addEventListener('beforeunload', () => {
        clearInterval(dropInterval);
    });
}

function createPaintDrop(container, colors) {
    const drop = document.createElement('div');
    drop.className = 'paint-drop';
    
    const size = Math.random() * 30 + 10;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const animationDuration = Math.random() * 2 + 1;
    const burstDelay = Math.random() * 5000 + 3000;
    const zDepth = Math.random() * 100 - 50;
    
    Object.assign(drop.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        backgroundColor: color,
        borderRadius: '50%',
        transform: `translate3d(0, 0, ${zDepth}px) scale(0)`,
        opacity: '0',
        filter: 'blur(1px)',
        boxShadow: `0 0 ${size/5}px ${color}`
    });
    
    container.appendChild(drop);
    
    // Animate drop falling
    requestAnimationFrame(() => {
        drop.style.transition = `transform ${animationDuration}s cubic-bezier(0.65, 0, 0.35, 1), opacity ${animationDuration}s ease`;
        drop.style.transform = `translate3d(0, 0, ${zDepth}px) scale(1)`;
        drop.style.opacity = '0.8';
        
        // Burst the drop after delay
        setTimeout(() => {
            burstPaintDrop(drop, container, color, size, zDepth);
        }, burstDelay);
    });
}

function burstPaintDrop(drop, container, color, size, zDepth) {
    const left = drop.offsetLeft;
    const top = drop.offsetTop;
    drop.remove();
    
    // Create particles
    const particleCount = Math.floor(Math.random() * 5) + 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'paint-particle';
        
        const particleSize = Math.random() * size/2 + size/4;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * size * 2 + size;
        const duration = Math.random() * 0.5 + 0.5;
        const delay = Math.random() * 0.2;
        const particleZ = zDepth + (Math.random() * 60 - 30);
        
        Object.assign(particle.style, {
            width: `${particleSize}px`,
            height: `${particleSize}px`,
            left: `${left}px`,
            top: `${top}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: '0.7',
            transform: `translate3d(0, 0, ${particleZ}px) scale(1)`,
            transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particleSize/3}px ${color}`
        });
        
        container.appendChild(particle);
        
        // Animate particle movement
        requestAnimationFrame(() => {
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            particle.style.transform = `translate3d(${x}px, ${y}px, ${particleZ}px) scale(0)`;
            particle.style.opacity = '0';
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), (duration + delay) * 1000);
        });
    }
}

// For Single Page Applications (reinitialize on route changes)
if (typeof window !== 'undefined') {
    window.addEventListener('load', initPaintDrops);
    window.addEventListener('popstate', initPaintDrops);
}