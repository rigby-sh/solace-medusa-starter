export {}

import { Page, expect } from '@playwright/test'

class Homepage {
    page: Page;
    homepageUrl: string;
    aboutUsPageUrl: string;
    shopPageUrl: string;
    productPageUrl: string;
    singleBlogPostPageUrl: string;
    allBlogPostsUrl: string;

    constructor(page: Page) {
        this.page = page; 
        this.homepageUrl = 'https://solace-medusa-starter.vercel.app/de';
        this.aboutUsPageUrl ='https://solace-medusa-starter.vercel.app/de/about-us';
        this.shopPageUrl = 'https://solace-medusa-starter.vercel.app/de/shop';
        this.productPageUrl = 'https://solace-medusa-starter.vercel.app/de/products/ashton-wooden-chair';
        this.singleBlogPostPageUrl = 'https://solace-medusa-starter.vercel.app/de/blog/maximizing-small-spaces';
        this.allBlogPostsUrl = 'https://solace-medusa-starter.vercel.app/de/blog'
    }

    async checkPageTitle() {
        const pageTitle = await this.page.title();

        expect(pageTitle).toBe('Solace Medusa Starter Template');
    }

    async checkShopTab() {
        await this.page.getByTestId('shop-dropdown').waitFor({ state: 'visible' });

        await this.page.getByTestId('shop-dropdown').hover({ force: true })

        await this.page.getByLabel("Shop all").isVisible();
    }

    async checkCollectionsTab() {
        await this.page.getByTestId('collections-dropdown').waitFor({ state: 'visible' });

        await this.page.getByTestId('collections-dropdown').hover({ force: true })

        await this.page.getByLabel("Discover").isVisible();
    }

    async checkAboutUsTab() {
        await this.page.getByTestId('about-us-dropdown').click();

        expect(this.aboutUsPageUrl).toContain('about-us');

    }

    async checkImgExisting() {
        const images = this.page.locator('img');

        const imageCount = await images.count();

        expect(imageCount).toBeGreaterThan(0);
    }

    async checkRedirectionByExploreNowBtn() {

        await this.page.getByRole('link', { name: "Explore now" }).click({ force: true });

        expect(this.shopPageUrl).toContain('/shop');
    }

    async checkRedirectionToSingleProduct() {
        await this.page.getByTestId('ashton---wooden-chair-product-tile').click({ force: true });

        expect(this.productPageUrl).toContain('/products/');
    }

    async checkRedirectionByViewAllBtn() {
        await this.page.getByRole('link', { name: 'View all' }).click({ force: true })
    
        expect(this.shopPageUrl).toContain('/shop')
    }

    async checkRedirectionToSingleBlogPost() {
        await this.page.locator('img[alt="Blog post image"]').first().click();

        expect(this.singleBlogPostPageUrl).toContain('/blog/maximizing-small-spaces');

    }

    async checkRedirectionToAllBlogPosts() {
        await this.page.getByRole('link', { name: 'Read more' }).click({ force: true })

        expect(this.allBlogPostsUrl).toContain('/blog');
    }
}

export default Homepage;
