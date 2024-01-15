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

describe("uuCmd comment/create", () => {
    test("create comment with postId and text - positive case", async () => {
        await TestHelper.login("StandardUsers");

        const existingPostId = "123456789";
        const dtoIn = {
            postId: existingPostId,
            text: "This is a comment on the post."
        };
        const result = await TestHelper.executePostCommand("comment/create", dtoIn);

        expect(result.data.postId).toEqual(existingPostId);
        expect(result.data.text).toEqual(dtoIn.text);
        expect(result.data.creatorIdentity).toBeDefined();
        expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("create comment without postId or text - negative case", async () => {
        await TestHelper.login("StandardUsers");

        try {
            await TestHelper.executePostCommand("comment/create", {});
        } catch (e) {
            expect(e.code).toEqual("uu-blog-main/comment/create/invalidDtoIn");
            expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(2);
            expect(e.status).toEqual(400);
        }
    });

    test("unauthorized user - negative case", async () => {
        try {
            const existingPostId = "123456789";
            const dtoIn = {
                postId: existingPostId,
                text: "This is a comment on the post."
            };
            await TestHelper.executePostCommand("comment/create", dtoIn);
        } catch (e) {
            expect(e.code).toEqual("uu-blog-main/comment/create/userNotAuthorized");
            expect(e.status).toEqual(403);
        }
    });
});