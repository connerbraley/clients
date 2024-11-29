import { clearGlobalAllocator, initGlobalAllocator } from "./global";
import { SecureArrayBuffer } from "./secure-array-buffer";
import { TestAllocator } from "./test/test-allocator";

describe("SecureArrayBuffer", () => {
  let allocator: TestAllocator;

  beforeEach(() => {
    allocator = new TestAllocator();
    initGlobalAllocator(allocator);
  });

  afterEach(() => {
    clearGlobalAllocator();
  });

  it("allocates memory using the global allocator", () => {
    new SecureArrayBuffer(10);

    expect(allocator.allocate).toHaveBeenCalledWith(10);
  });

  it("returns a Uint8Array view of the buffer", () => {
    const buffer = new SecureArrayBuffer(10);

    const view = buffer.asUint8Array();

    expect(view).toBeInstanceOf(Uint8Array);
    expect((view as any).buffer).toBe(allocator.buffers[0]);
  });
});
