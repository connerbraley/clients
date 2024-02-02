import { flushPromises, postWindowMessage } from "../../autofill/jest/testing-utils";

describe("LP Suppress Import Download", () => {
  const downloadAttribute = "file.csv";
  const hrefAttribute = "https://example.com/file.csv";
  const overridenHrefAttribute = "javascript:void(0)";
  let anchor: HTMLAnchorElement;

  beforeEach(() => {
    jest.spyOn(Element.prototype, "appendChild");
    jest.spyOn(window, "addEventListener");

    require("./lp-suppress-import-download");

    anchor = document.createElement("a");
    anchor.download = downloadAttribute;
    anchor.href = hrefAttribute;
    anchor.click = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("replaces the attributes of an anchor element that triggers a download", () => {
    document.body.appendChild(anchor);

    expect(anchor.href).toBe(overridenHrefAttribute);
    expect(anchor.download).toBe("");
  });

  it("triggers the CSVDownload when receiving a `triggerCsvDownload` window message", async () => {
    window.document.createElement = jest.fn(() => anchor);
    jest.spyOn(window, "removeEventListener");

    document.body.appendChild(anchor);

    expect(anchor.href).toBe(overridenHrefAttribute);
    expect(anchor.download).toBe("");

    postWindowMessage({ command: "triggerCsvDownload" });
    await flushPromises();

    expect(anchor.click).toHaveBeenCalled();
    expect(anchor.href).toEqual(hrefAttribute);
    expect(anchor.download).toEqual(downloadAttribute);
    expect(window.removeEventListener).toHaveBeenCalledWith("message", expect.any(Function));
  });

  it("skips triggering the CSV download for window messages that do not have the correct command", () => {
    document.body.appendChild(anchor);

    postWindowMessage({ command: "notTriggerCsvDownload" });

    expect(anchor.click).not.toHaveBeenCalled();
  });

  it("skips triggering the CSV download for window messages that do not have a data value", () => {
    document.body.appendChild(anchor);

    postWindowMessage(null);
  });
});
