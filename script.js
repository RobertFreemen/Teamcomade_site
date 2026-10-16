// Ждем, пока вся страница полностью загрузится
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ДОБАВЛЕНИЕ КНОПКИ ДЛЯ ТЕМНОЙ ТЕМЫ ---
    const nav = document.querySelector(".nav");
    if (nav) {
        const themeBtn = document.createElement("button");
        themeBtn.innerText = "🌓 Тема";
        themeBtn.style.cssText = "background: none; border: 1px solid #00d2c4; color: #00d2c4; padding: 0.3rem 0.8rem; margin-left: 1.5rem; cursor: pointer; border-radius: 4px; font-weight: 600;";
        nav.appendChild(themeBtn);

        themeBtn.addEventListener("click", () => {
            const body = document.body;
            if (body.style.backgroundColor === "rgb(244, 247, 246)" || body.style.backgroundColor === "") {
                // Включаем темную тему
                body.style.backgroundColor = "#071120";
                body.style.color = "#ffffff";
                document.querySelectorAll(".feature-card, .invest-card, .chart-mock, .news-sidebar, .market-ticker").forEach(card => {
                    card.style.backgroundColor = "#0b1a30";
                    card.style.color = "#ffffff";
                });
            } else {
                // Возвращаем светлую тему
                body.style.backgroundColor = "#f4f7f6";
                body.style.color = "#333333";
                document.querySelectorAll(".feature-card, .invest-card, .chart-mock, .news-sidebar, .market-ticker").forEach(card => {
                    card.style.backgroundColor = "#ffffff";
                    card.style.color = "#333333";
                });
            }
        });
    }

    // --- 2. ОЖИВЛЕНИЕ КАЛЬКУЛЯТОРА (Для страницы investments.html) ---
    const calcSection = document.querySelector(".calculator-preview");
    if (calcSection) {
        // Делаем поля активными, убирая атрибут 'disabled'
        const inputs = calcSection.querySelectorAll("input");
        const button = calcSection.querySelector("button");
        
        inputs.forEach((input, index) => {
            input.removeAttribute("disabled");
            input.style.background = "#fff";
            input.style.color = "#333";
            if (index === 0) input.placeholder = "Сумма (например, 100000)";
            if (index === 1) input.placeholder = "Ставка % (например, 15)";
            if (index === 2) input.placeholder = "Срок (лет)";
        });

        button.removeAttribute("disabled");
        
        // Создаем блок для вывода результата
        const resultDiv = document.createElement("div");
        resultDiv.style.cssText = "margin-top: 1.5rem; font-size: 1.2rem; font-weight: bold; color: #00d2c4;";
        calcSection.appendChild(resultDiv);

        button.addEventListener("click", () => {
            const sum = parseFloat(inputs[0].value) || 0;
            const percent = parseFloat(inputs[1].value) || 0;
            const years = parseFloat(inputs[2].value) || 0;

            if (sum > 0 && percent > 0 && years > 0) {
                // Формула сложного процента (годовое начисление)
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
        // Изначально скрываем линию
        graphLine.style.transition = "transform 1.5s ease-out";
        graphLine.style.transform = "scaleX(0)";
        graphLine.style.transformOrigin = "left";

        // Через мгновение запускаем плавную анимацию роста графика слева направо
        setTimeout(() => {
            graphLine.style.transform = "scaleX(1)";
        }, 300);
    }
});
