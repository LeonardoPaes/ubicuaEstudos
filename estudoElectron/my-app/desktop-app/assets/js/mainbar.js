var mainbar = `
<header>
    <strong>
        <span>S</span>KAT
    </strong>
    <nav class="main-bar">
        <ul>
            <li><img src="../assets/images/btn-close.svg" id="closeBtn"></li>
            <li><img src="../assets/images/maximize.svg" id="maxBtn"></li>
            <li><img src="../assets/images/btn-min.svg" id="minBtn" (click)="minimizeWindow()"></li>
        </ul>
    </nav>
</header>
`;

document.getElementById("mainbar").innerHTML = mainbar;