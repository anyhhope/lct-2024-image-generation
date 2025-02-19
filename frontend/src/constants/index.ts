export const sidebarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: "/assets/icons/people.svg",
        route: "/all-users",
        label: "People",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: "/create-post",
        label: "Create Post",
    },
];

export const bottombarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: "/assets/icons/bookmark.svg",
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: "/create-post",
        label: "Create",
    },
];

export const topbarLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Главная",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: "/generator",
        label: "Генератор",
    },
    {
        imgURL: "/assets/icons/wallpaper.svg",
        route: "/editor",
        label: "Конструктор",
    },
    {
        imgURL: "/assets/icons/gallery-add.svg",
        route: "/my-images",
        label: "Мои изображения",
    },
];

export const topbarAdminLinks = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/admin-panel",
        label: "Администрирование",
    },
];

export const categoryToTitle: IConstant = {
    mortgage: "Ипотека",
    autocredit: "Автокредиты",
    credit: "Кредиты",
    accounts_deposits: "Вклады",
    card: "Банковские карты",
    insurance: "Страхование",
    currency_exchange: "Обмен валют"
};

export const imageByCategory = [
    {
        imgURL: "/assets/money_house.png",
        color: "#FFC1A4",
        route: "/my-images",
        title: "Ипотека",
        category: "mortgage",
    },
    {
        imgURL: "/assets/car_percent.png",
        color: "#476BF0",
        route: "/my-images",
        title: "Автокредиты",
        category: "autocredit",
    },
    {
        imgURL: "/assets/card_ok.png",
        color: "#FFC1A4",
        route: "/my-images",
        title: "Кредиты",
        category: "credit",

    },
    {
        imgURL: "/assets/shield.png",
        color: "#476BF0",
        route: "/my-images",
        title: "Вклады",
        category: "accounts_deposits",

    },
    {
        imgURL: "/assets/card_present.png",
        color: "#FFC1A4",
        route: "/my-images",
        title: "Банковские карты",
        category: "card",

    },
    {
        imgURL: "/assets/shield_car.png",
        color: "#476BF0",
        route: "/my-images",
        title: "Страхование",
        category: "insurance",

    },
    {
        imgURL: "/assets/bag_coins.png",
        color: "#FFC1A4",
        route: "/my-images",
        title: "Обмен валют",
        category: "currency_exchange",

    },
];

export interface IConstant {
    [key: string]: string;
}


export const ChannelSelectValues: IConstant[] = [
    { 'TMO': 'Колл центр (телемеркетинг)' },
    { 'SMS': 'СМС' },
    { 'PUSH': 'Пуш в мобильном банке' },
    { 'EMAIL': 'Email' },
    { 'MOB_BANNER': 'Баннер в мобильном приложении' },
    { 'OFFICE_BANNER': 'Мессенджер в офисе' },
    { 'MOBILE_CHAT': 'Чат мобильного банка' },
    { 'KND': 'Курьер на дом' },
]

export const ProductSelectValues: IConstant[] = [
    { 'ПК': 'Классический потребительский кредит' },
    { 'TOPUP': 'Рефинансирование внутреннего ПК в Газпромбанке' },
    { 'REFIN': 'Рефинансирование внешнего ПК в другом банке' },
    { 'CC': 'Кредитная карта' },
    { 'AUTO': 'Классический автокредит' },
    { 'AUTO_SCR': 'Кредит под залог авто' },
    { 'MORTG': 'Ипотека' },
    { 'MORTG_REFIN': 'Рефинансирование ипотеки' },
    { 'MORTG_SCR': 'Кредит под залог недвижимости' },
    { 'DEPOSIT': 'Депозит' },
    { 'SAVE_ACC': 'Накопительный счет' },
    { 'DC': 'Дебетовая карта' },
    { 'PREMIUM': 'Премиальная карта' },
    { 'INVEST': 'Брокерский и инвестиционный счет' },
    { 'ISG': 'Инвестиционное страхование жизни' },
    { 'NSG': 'Накопительное страхование жизни' },
    { 'INS_LIFE': 'Страхование жизни' },
    { 'TRUST': 'Доверительное управление' },
    { 'OMS': 'Обезличенный металлический счет' },
    { 'IZP': 'Индивидуальный зарплатный проект' },
    { 'CURR_EXC': 'Обмен валюты' },
]

export const imageTypeValues: IConstant[] = [
    { 'megabanner': 'Megabanner' },
    { 'ghost': 'Ghost' },
    { 'nbo': 'NBO' },
]

export const bgGenerationColors: string[] = ["#FFC1A4", "#476BF0", "#FD7E0B", "#85B6F6", "#D8DFFF", "#C4E7FF", 
    "#9892F5", "#00AEE7"
]


export const productCategoryMap = {
    "ПК": "credit",
    "TOPUP": "credit",
    "REFIN": "credit",
    "CC": "credit",
    "AUTO_SCR": "credit",
    "MORTG_SCR": "credit",
    "AUTO": "autocredit",
    "MORTG": "mortgage",
    "MORTG_REFI": "mortgage",
    "DEPOSIT": "accounts_deposits",
    "SAVE_ACC": "accounts_deposits",
    "INVEST": "accounts_deposits",
    "TRUST": "accounts_deposits",
    "OMS": "accounts_deposits",
    "IZP": "card",
    "DC": "card",
    "PREMIUM": "card",
    "ISG": "insurance",
    "NSG": "insurance",
    "INS_LIFE": "insurance",
    "INS_PROPERTY": "insurance",
    "CURR_EXC": "currency_exchange"
}
