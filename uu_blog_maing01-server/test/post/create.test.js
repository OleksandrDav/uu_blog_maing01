const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
    await TestHelper.setup();
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
    await TestHelper.teardown();
});

describe("uuCmd post/create", () => {
    test("create post with title and postText - positive case", async () => {
        await TestHelper.login("Authorities");

        const dtoIn = {
            title: "New Post Title",
            postText: "This is the post text."
        };
        const result = await TestHelper.executePostCommand("post/create", dtoIn);

        expect(result.data.title).toEqual(dtoIn.title);
        expect(result.data.postText).toEqual(dtoIn.postText);
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("create post with title, postText, and image - positive case", async () => {
        await TestHelper.login("Authorities");

        const dtoIn = {
            title: "New Post Title",
            postText: "This is the post text.",
            image: {
                data: "base64encodedImage",
                filename: "image.jpg",
                contentType: "image/jpeg"
            }
        };
        const result = await TestHelper.executePostCommand("post/create", dtoIn);

        expect(result.data.title).toEqual(dtoIn.title);
        expect(result.data.postText).toEqual(dtoIn.postText);
        expect(result.data.image).toBeDefined();
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("create post without postText or title - negative case", async () => {
        await TestHelper.login("Authorities");

        try {
            await TestHelper.executePostCommand("post/create", {});
        } catch (e) {
            expect(e.code).toEqual("uu-blog-main/post/create/invalidDtoIn");
            expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(2); // Both title and postText are missing
            expect(e.status).toEqual(400);
        }
    });

    test("unauthorized user - negative case", async () => {
        try {
            const dtoIn = {
                title: "New Post Title",
                postText: "This is the post text."
            };
            await TestHelper.executePostCommand("post/create", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uu-blog-main/post/create/userNotAuthorized");
            expect(e.status).toEqual(403);
        }
    });
});
