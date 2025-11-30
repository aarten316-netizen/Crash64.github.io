// Улучшенные обработчики для кнопок
function enhanceButtons() {
    const buttons = document.querySelectorAll('.smooth-btn');
    
    buttons.forEach(btn => {
        // Добавляем эффект ripple
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Параллакс эффект при движении мыши
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-5px) scale(1.03) perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1.03)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// CSS для ripple эффекта
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', enhanceButtons);