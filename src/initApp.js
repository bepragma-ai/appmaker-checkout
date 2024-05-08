import '@appmaker-xyz/plugins';
import '@appmaker-xyz/shopify-core-theme';
import { activateLocalTheme, activateLocalExtension } from '@appmaker-xyz/core';

// Import packages here
// import '@appmaker-partners/<package-name>';

import '@appmaker-packages/extension-pragma-checkout';
    
activateLocalExtension(
        {"id":"pragma-checkout","settings":{}});