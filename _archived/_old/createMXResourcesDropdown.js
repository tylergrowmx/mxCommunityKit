import { MXKit, config } from "./MXKit";
const createMXResourcesDropdown = () => {
    try {
        // create dropdowns unless config.isMobile === true
        if (config.isMobile) return null;

        const hideReplaced = () =>
            [
                "a.header-navigation_link.title-mx-docs",
                "a.header-navigation_link.title-support",
                "a.header-navigation_link.title-mx-academy",
            ].forEach((sel) => {
                const ele = document.querySelector(sel);
                const parent = ele.parentElement;
                parent.classList.add("nav-item-hidden");
                parent.style.display = "none";
            });

        const created = MXKit.createDropdown(
            "resources",
            "Resources",
            1,
            [
                {
                    title: "MXKit Academy",
                    href: "https://academy.mx.com/hc/en-us",
                    target: "_blank",
                },
                {
                    title: "MXKit Docs",
                    href: "https://docs.mx.com/",
                    target: "_blank",
                },
            ],
            [
                {
                    title: "Support",
                    href: "https://moneydesktop.zendesk.com/hc/en-us/restricted?return_to=https%3A%2F%2Fmoneydesktop.zendesk.com%2Fhc%2Fen-us",
                    target: "_blank",
                },
            ],
            [
                {
                    title: "Support",
                    href: "https://moneydesktop.zendesk.com/hc/en-us/restricted?return_to=https%3A%2F%2Fmoneydesktop.zendesk.com%2Fhc%2Fen-us",
                    target: "_blank",
                },
            ]
        );
        try {
            hideReplaced();
        } catch (e) {
            console.error("Error hiding replaced dropdowns", e);
        }

        return created;
    } catch (mxCommunityCustomDropdownError) {
        console.warn(
            "Error @ mxCommunityCustomDropdownError \nPlease inform Tyler Grow of the error. More details below...\n"
        );
        console.warn(mxCommunityCustomDropdownError);
        return null;
    }
};
export { createMXResourcesDropdown, createMXResourcesDropdown as default };