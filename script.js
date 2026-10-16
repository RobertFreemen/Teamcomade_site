// Ждем, пока вся страница полностью загрузится
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ПРАВИЛЬНОЕ ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (Светлая / Темная) ---
    const nav = document.querySelector(".nav");
    if (nav) {
        const themeBtn = document.createElement("button");
        themeBtn.innerText = "🌓 Тема";
        // Стильная кнопка в тон вашего дизайна
        themeBtn.style.cssText = "background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 0.5rem 1rem; margin-left: 1.5rem; cursor: pointer; border-radius: 50px; font-weight: 600; transition: all 0.3s;";
        nav.appendChild(themeBtn);

        // Флаг для отслеживания текущей темы (изначально темная, как в CSS)
        let isDark = true;

        themeBtn.addEventListener("click", () => {
            isDark = !isDark; // Переключаем состояние

            if (!isDark) {
                // Включаем светлую тему
                document.documentElement.style.setProperty('--bg-main', '#f1f5f9');
                document.documentElement.style.setProperty('--bg-card', '#ffffff');
                document.documentElement.style.setProperty('--text-primary', '#0f172a');
                document.documentElement.style.setProperty('--text-secondary', '#475569');
                document.documentElement.style.setProperty('--border-glass', 'rgba(0, 0, 0, 0.08)');
                
                // Перекрашиваем заголовки, которые сделаны градиентом
                const heroH1 = document.querySelector('.hero h1');
                if (heroH1) heroH1.style.background = 'none';
                if (heroH1) heroH1.style.webkitTextFillColor = '#0f172a';
                
                const pageTitle = document.querySelector('.page-title');
                if (pageTitle) pageTitle.style.background = 'none';
                if (pageTitle) pageTitle.style.webkitTextFillColor = '#0f172a';

                themeBtn.style.background = 'rgba(0,0,0,0.05)';
                themeBtn.style.color = '#0f172a';
                themeBtn.style.borderColor = 'rgba(0,0,0,0.1)';
            } else {
                // Возвращаем стандартную премиальную темную тему
                document.documentElement.style.setProperty('--bg-main', '#060913');
                document.documentElement.style.setProperty('--bg-card', 'rgba(15, 22, 42, 0.65)');
                document.documentElement.style.setProperty('--text-primary', '#ffffff');
                document.documentElement.style.setProperty('--text-secondary', '#94a3b8');
                document.documentElement.style.setProperty('--border-glass', 'rgba(255, 255, 255, 0.06)');
                
                // Возвращаем градиенты заголовкам
                const heroH1 = document.querySelector('.hero h1');
                if (heroH1) heroH1.style.background = 'linear-gradient(to right, #ffffff, #cbd5e1)';
                if (heroH1) heroH1.style.webkitBackgroundClip = 'text';
                if (heroH1) heroH1.style.webkitTextFillColor = 'transparent';
                
                const pageTitle = document.querySelector('.page-title');
                if (pageTitle) pageTitle.style.background = 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)';
                if (pageTitle) pageTitle.style.webkitBackgroundClip = 'text';
                if (pageTitle) pageTitle.style.webkitTextFillColor = 'transparent';

                themeBtn.style.background = 'rgba(255,255,255,0.05)';
                themeBtn.style.color = '#ffffff';
                themeBtn.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
    }

    // --- 2. ОЖИВЛЕНИЕ КАЛЬКУЛЯТОРА (Для страницы investments.html) ---
    const calcSection = document.querySelector(".calculator-preview");
    if (calcSection) {
        const inputs = calcSection.querySelectorAll("input");
        const button = calcSection.querySelector("button");
        
        inputs.forEach((input, index) => {
            input.removeAttribute("disabled");
            if (index === 0) input.placeholder = "Сумма (например, 100000)";
            if (index === 1) input.placeholder = "Ставка % (например, 15)";
            if (index === 2) input.placeholder = "Срок (лет)";
        });

        button.removeAttribute("disabled");
        
        const resultDiv = document.createElement("div");
        resultDiv.style.cssText = "margin-top: 1.5rem; font-size: 1.2rem; font-weight: bold; color: var(--accent-neon);";
        calcSection.appendChild(resultDiv);

        button.addEventListener("click", () => {
            const sum = parseFloat(inputs[0].value) || 0;
            const percent = parseFloat(inputs[1].value) || 0;
            const years = parseFloat(inputs[2].value) || 0;

            if (sum > 0 && percent > 0 && years > 0) {
                const finalAmount = sum * Math.pow((1 + (percent / 100)), years);
                resultDiv.innerText = `Итоговый капитал через ${years} лет: ${Math.round(finalAmount).toLocaleString()} ₽`;
            } else {
                resultDiv.innerText = "Пожалуйста, заполните все поля корректными числами!";
            }
        });
    }

    // --- 3. АНИМАЦИЯ ГРАФИКА (Для страницы analytics.html) ---
    const graphLine = document.querySelector(".graph-line");
    if (graphLine) {
        graphLine.style.transition = "transform 1.5s ease-out";
        graphLine.style.transform = "scaleX(0)";
        graphLine.style.transformOrigin = "left";

        setTimeout(() => {
            graphLine.style.transform = "scaleX(1)";
        }, 300);
    }
});
