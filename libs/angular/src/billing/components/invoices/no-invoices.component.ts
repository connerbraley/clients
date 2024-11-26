import { Component } from "@angular/core";

import { svgIcon } from "@bitwarden/components";

const partnerTrustIcon = svgIcon`
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69 43.6511C70.1025 44.1328 71.32 44.4 72.6 44.4C77.5706 44.4 81.6 40.3706 81.6 35.4C81.6 30.4294 77.5706 26.4 72.6 26.4C67.6295 26.4 63.6 30.4294 63.6 35.4C63.6 36.0164 63.662 36.6184 63.7801 37.2" stroke="#CED4DC" stroke-width="2"/>
    <path d="M69 44.8416C70.1522 44.553 71.3559 44.4 72.5943 44.4C80.1533 44.4 86.4194 50.0998 87.5598 57.5529C87.7996 59.1204 86.9541 60 85.3451 60C79.7231 60 75.6474 60 71.4 60" stroke="#CED4DC" stroke-width="2"/>
    <path d="M51 43.6511C49.8976 44.1328 48.68 44.4 47.4 44.4C42.4295 44.4 38.4 40.3706 38.4 35.4C38.4 30.4294 42.4295 26.4 47.4 26.4C52.3706 26.4 56.4 30.4294 56.4 35.4C56.4 36.0164 56.338 36.6184 56.22 37.2" stroke="#CED4DC" stroke-width="2"/>
    <path d="M51 44.8416C49.8478 44.553 48.6441 44.4 47.4057 44.4C39.8467 44.4 33.5806 50.0998 32.4402 57.5529C32.2004 59.1204 33.0459 60 34.6549 60C40.2769 60 44.3526 60 48.6 60" stroke="#CED4DC" stroke-width="2"/>
    <circle cx="60" cy="45.6" r="9" stroke="#CED4DC" stroke-width="2"/>
    <path d="M72.7451 70.2C62.3773 70.2 57.2682 70.2 46.6437 70.2C45.3864 70.2 44.8665 68.8141 45.0289 67.7529C46.1693 60.2998 52.4354 54.6 59.9943 54.6C67.5533 54.6 73.8194 60.2998 74.9598 67.7529C75.1996 69.3204 74.3541 70.2 72.7451 70.2Z" stroke="#CED4DC" stroke-width="2"/>
    <path d="M73.557 103.195C74.3197 104.319 74.3197 105.443 73.557 106.272C73.1462 106.745 72.3835 107.041 71.738 107.041C71.6242 107.041 71.5013 107.032 71.3801 107.011C71.3345 108.505 70.5896 109.217 70.0948 109.467C69.7427 109.703 69.3318 109.822 68.9212 109.822C68.8703 109.822 68.8204 109.82 68.7714 109.816C68.7035 109.811 68.6373 109.803 68.5729 109.792C68.5559 110.332 68.3591 110.827 67.9823 111.242C67.6302 111.833 66.926 112.129 66.2808 112.129C66.1045 112.129 65.9874 112.129 65.8112 112.07C65.7753 112.058 65.7381 112.044 65.6997 112.028C65.5215 112.624 65.0169 113.105 64.227 113.431C63.9924 113.49 63.8162 113.49 63.5815 113.49C62.4417 113.49 60.9477 112.633 60.0352 112.028M55.5 88.7567C53.6867 88.9991 51.6246 89.9258 50.4378 90.4744C50.2985 90.5095 50.1797 90.5655 50.0693 90.6176L50.0687 90.6179C49.9937 90.6534 49.9223 90.6871 49.851 90.711C49.5281 90.5373 49.0708 90.3955 48.4995 90.2184C47.5139 89.9127 46.1886 89.5016 44.6287 88.6402C44.3941 88.5219 44.0419 88.581 43.8657 88.8769L37.6461 99.5268C37.4699 99.8226 37.5287 100.178 37.822 100.355L46.8 105.019" stroke="#CED4DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M73.7624 103.371C73.6448 103.371 73.4683 103.313 73.3507 103.195L67.7625 97.9108C63.1743 96.7365 61.8803 93.9181 61.4097 92.8024C61.0567 92.8612 60.5273 92.9199 59.645 92.9199C59.2332 93.2135 58.1744 94.0355 56.7039 94.7988C55.3509 95.5034 53.998 95.2098 53.4098 94.2117C53.0568 93.5658 52.998 92.8024 53.351 92.1566C55.7039 87.5766 58.4685 86.6372 60.3509 86.6372C61.4685 86.6372 62.1744 86.9895 62.2332 86.9895L69.2919 90.1015L75.7624 87.1656C75.8801 87.1069 76.0565 87.1069 76.233 87.1656C76.4095 87.2243 76.5271 87.3418 76.5859 87.4592L82.6447 97.8521C82.7623 98.1457 82.6447 98.4393 82.4094 98.6154L74.0565 103.313C73.9389 103.371 73.8801 103.371 73.7624 103.371Z" stroke="#CED4DC" stroke-width="2"/>
    <path d="M46.6097 107.206C47.0221 108.443 48.394 109.005 49.044 109.195C49.217 109.923 49.5794 110.391 49.9178 110.692C50.5086 111.164 51.1584 111.342 51.7491 111.342C51.9248 111.342 52.0796 111.321 52.2135 111.291C52.2516 111.368 52.2936 111.444 52.3399 111.519C52.8716 112.346 53.8168 112.818 55.2346 112.937C55.3143 112.937 55.3897 112.919 55.4573 112.887C56.0276 113.588 56.9845 114 57.893 114C58.7791 114 59.488 113.527 59.7243 112.759C60.0787 111.223 59.9606 109.628 59.7243 108.742C59.5602 108.031 59.1935 106.763 57.6392 106.673C57.4017 106.121 56.803 105.205 55.4709 105.08C55.1879 105.053 54.9235 105.086 54.6774 105.164C54.4496 104.62 54.0132 103.917 53.2851 103.662C52.7534 103.485 51.9264 103.662 51.1584 104.134C51.1181 104.161 51.0782 104.187 51.0387 104.215C50.6899 103.795 50.1003 103.263 49.3271 103.189C48.6182 103.13 48.0275 103.485 47.4367 104.193C46.5506 105.316 46.3143 106.32 46.6097 107.206Z" stroke="#CED4DC" stroke-width="2"/>
    <path d="M51.9 104.4C51.5709 104.603 49.9229 105.531 49.5 106.8C49.2 107.7 49.5 108.9 49.8 109.5" stroke="#CED4DC" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M54.6703 105.317C54.1767 105.571 53.0709 106.485 52.597 108.109C52.1231 109.734 52.3995 110.816 52.597 111.155" stroke="#CED4DC" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M57.2 107.263C56.7063 107.517 56.051 108.431 55.7104 109.598C55.3697 110.766 55.5129 112.179 55.7104 112.517" stroke="#CED4DC" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M65.5675 111.739C64.0108 110.96 61.2866 108.431 61.2866 108.431" stroke="#CED4DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M68.2914 109.598C66.1686 108.591 62.4538 105.317 62.4538 105.317" stroke="#CED4DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M71.4049 106.874C68.9991 105.775 64.789 102.204 64.789 102.204" stroke="#CED4DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M86.9971 91.8C95.5145 86.0616 101.962 77.753 105.392 68.094C108.822 58.435 109.055 47.9345 106.056 38.134C103.057 28.3336 96.9838 19.7494 88.7289 13.6419C80.474 7.53438 70.4717 4.22518 60.1907 4.20014C49.9096 4.1751 39.8913 7.43554 31.6065 13.5028C23.3217 19.5701 17.2069 28.1245 14.1599 37.9102C11.1128 47.696 11.294 58.1975 14.6768 67.8731C18.0596 77.5486 24.4658 85.8885 32.955 91.6684" stroke="#CED4DC" stroke-width="2" stroke-linecap="round"/>
    <path d="M84.6771 88.2C92.4374 82.9725 98.3114 75.4037 101.437 66.6048C104.562 57.8059 104.774 48.2403 102.042 39.3125C99.3091 30.3847 93.7761 22.5649 86.255 17.0012C78.7338 11.4375 69.6207 8.42293 60.2535 8.40012C50.8863 8.37731 41.7585 11.3474 34.2101 16.8745C26.6618 22.4015 21.0905 30.1942 18.3143 39.1086C15.5381 48.023 15.7032 57.5895 18.7853 66.4035C21.8674 75.2176 27.7042 82.8149 35.4388 88.0801" stroke="#CED4DC" stroke-linecap="round"/>
</svg>
`;

@Component({
  selector: "app-no-invoices",
  template: `<div class="tw-flex tw-flex-col tw-items-center tw-text-info">
    <bit-icon [icon]="icon"></bit-icon>
    <p class="tw-mt-4">{{ "noInvoicesToList" | i18n }}</p>
  </div>`,
})
export class NoInvoicesComponent {
  icon = partnerTrustIcon;
}
