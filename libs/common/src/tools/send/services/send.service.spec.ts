import { mock } from "jest-mock-extended";
import { BehaviorSubject, of } from "rxjs";

import {
  FakeAccountService,
  FakeActiveUserState,
  FakeStateProvider,
  mockAccountServiceWith,
} from "../../../../spec";
import { CryptoService } from "../../../platform/abstractions/crypto.service";
import { EncryptService } from "../../../platform/abstractions/encrypt.service";
import { I18nService } from "../../../platform/abstractions/i18n.service";
import { KeyGenerationService } from "../../../platform/abstractions/key-generation.service";
import { Utils } from "../../../platform/misc/utils";
import { EncString } from "../../../platform/models/domain/enc-string";
import { SymmetricCryptoKey } from "../../../platform/models/domain/symmetric-crypto-key";
import { ContainerService } from "../../../platform/services/container.service";
import { UserId } from "../../../types/guid";
import { UserKey } from "../../../types/key";
import { SendData } from "../models/data/send.data";
import { Send } from "../models/domain/send";
import { SendView } from "../models/view/send.view";

import { AsymmetricalSendState } from "./asymmetrical-send-state.abstraction";
import { SEND_USER_DECRYPTED, SEND_USER_ENCRYPTED } from "./key-definitions";
import { SendStateProvider } from "./send-state.provider";
import { SendService } from "./send.service";

describe("SendService", () => {
  const cryptoService = mock<CryptoService>();
  const i18nService = mock<I18nService>();
  const keyGenerationService = mock<KeyGenerationService>();
  const encryptService = mock<EncryptService>();
  const sendStateService = mock<AsymmetricalSendState>();

  let sendStateProvider: SendStateProvider;
  let sendService: SendService;

  let stateProvider: FakeStateProvider;
  let encryptedState: FakeActiveUserState<Record<string, SendData>>;
  let decryptedState: FakeActiveUserState<SendView[]>;

  const mockUserId = Utils.newGuid() as UserId;
  let accountService: FakeAccountService;

  beforeEach(() => {
    accountService = mockAccountServiceWith(mockUserId);
    stateProvider = new FakeStateProvider(accountService);
    sendStateProvider = new SendStateProvider(stateProvider);

    (window as any).bitwardenContainerService = new ContainerService(cryptoService, encryptService);

    sendService = new SendService(
      cryptoService,
      i18nService,
      keyGenerationService,
      sendStateProvider,
      sendStateService,
    );

    // Initial encrypted state
    encryptedState = stateProvider.activeUser.getFake(SEND_USER_ENCRYPTED);
    encryptedState.nextState({
      "1": sendData("1", "Test Send"),
    });

    const mockSend = send("1", "Send 1");
    const sends = new BehaviorSubject<Send[]>([mockSend]);
    sendStateService.sends$ = sends;

    sendService = new SendService(
      cryptoService,
      i18nService,
      keyGenerationService,
      sendStateProvider,
      sendStateService,
    );
  });

  afterEach(() => {
    // Initial decrypted state
    decryptedState = stateProvider.activeUser.getFake(SEND_USER_DECRYPTED);
    decryptedState.nextState([sendView("1", "Test Send")]);
  });

  // describe("get", () => {
  //   it("exists", async () => {
  //     const result = await sendService.get("1");

  //     expect(result).toEqual(sendView("1", "Test Send"));
  //   });

  //   it("does not exist", async () => {
  //     const result = await sendService.get("2");

  //     expect(result).toBe(undefined);
  //   });
  // });

  // describe("get$", () => {
  //   it("exists", async () => {
  //     const result = await firstValueFrom(sendService.get$("1"));

  //     expect(result).toEqual(send("1", "Test Send"));
  //   });

  //   it("does not exist", async () => {
  //     const result = await firstValueFrom(sendService.get$("2"));

  //     expect(result).toBe(undefined);
  //   });

  //   it("updated observable", async () => {
  //     const singleSendObservable = sendService.get$("1");
  //     const result = await firstValueFrom(singleSendObservable);
  //     expect(result).toEqual(send("1", "Test Send"));

  //     await sendService.replace({
  //       "1": sendData("1", "Test Send Updated"),
  //     });

  //     const result2 = await firstValueFrom(singleSendObservable);
  //     expect(result2).toEqual(send("1", "Test Send Updated"));
  //   });

  //   it("reports a change when name changes on a new send", async () => {
  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });
  //     const sendDataObject = sendData("1", "Test Send 2");

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("reports a change when notes changes on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     sendDataObject.notes = "New notes";
  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("reports a change when Text changes on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     sendDataObject.text.text = "new text";
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("reports a change when Text is set as null on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     sendDataObject.text = null;
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("Doesn't reports a change when File changes on a new send", async () => {
  //     const sendDataObject = createSendData({
  //       type: SendType.File,
  //       file: new SendFileData(new SendFileApi({ FileName: "name of file" })),
  //     }) as SendData;
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     sendDataObject.file = new SendFileData(new SendFileApi({ FileName: "updated name of file" }));
  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(false);
  //   });

  //   it("reports a change when key changes on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     sendDataObject.key = "newKey";
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("reports a change when revisionDate changes on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     sendDataObject.revisionDate = "2025-04-05";
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("reports a change when a property is set as null on a new send", async () => {
  //     const sendDataObject = createSendData() as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     sendDataObject.name = null;
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("does not reports a change when text's text is set as null on a new send and old send and reports a change then new send sets a text", async () => {
  //     const sendDataObject = createSendData({
  //       text: new SendTextData(new SendTextApi({ Text: null })),
  //     }) as SendData;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(false);

  //     sendDataObject.text.text = "Asdf";
  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });

  //   it("do not reports a change when nothing changes on the observed send", async () => {
  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });

  //     const sendDataObject = sendData("1", "Test Send");

  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     await sendService.replace({
  //       "1": sendDataObject,
  //       "2": sendData("3", "Test Send 3"),
  //     });

  //     expect(changed).toEqual(false);
  //   });

  //   it("reports a change when the observed send is deleted", async () => {
  //     let changed = false;
  //     sendService.get$("1").subscribe(() => {
  //       changed = true;
  //     });
  //     //it is immediately called when subscribed, we need to reset the value
  //     changed = false;

  //     await sendService.replace({
  //       "2": sendData("2", "Test Send 2"),
  //     });

  //     expect(changed).toEqual(true);
  //   });
  // });

  it("getAll", async () => {
    const sends = await sendService.getAll();
    const send1 = sends[0];

    expect(sends).toHaveLength(1);
    expect(send1).toEqual(send("1", "Test Send"));
  });

  describe("getFromState", () => {
    it("exists", async () => {
      const result = await sendService.getFromState("1");

      expect(result).toEqual(send("1", "Test Send"));
    });
    it("does not exist", async () => {
      const result = await sendService.getFromState("2");

      expect(result).toBe(null);
    });
  });

  it("getAllDecryptedFromState", async () => {
    await sendService.getAllDecryptedFromState();

    expect(sendStateProvider.getDecryptedSends).toHaveBeenCalledTimes(1);
  });

  describe("getRotatedKeys", () => {
    let encryptedKey: EncString;
    beforeEach(() => {
      cryptoService.decryptToBytes.mockResolvedValue(new Uint8Array(32));
      encryptedKey = new EncString("Re-encrypted Send Key");
      cryptoService.encrypt.mockResolvedValue(encryptedKey);
    });

    it("returns re-encrypted user sends", async () => {
      const newUserKey = new SymmetricCryptoKey(new Uint8Array(32)) as UserKey;
      const mockSend = send("1", "Send 1");
      mockSend.key = encryptedKey;
      const sends = new BehaviorSubject<Send[]>([mockSend]);
      sendStateService.sends$ = sends;

      const result = await sendService.getRotatedKeys(newUserKey);

      expect(result).toMatchObject([{ id: "1", key: "Re-encrypted Send Key" }]);
    });

    it("returns null if there are no sends", async () => {
      // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sendService.replace(null);
      sendStateService.sends$ = of([]);

      const newUserKey = new SymmetricCryptoKey(new Uint8Array(32)) as UserKey;
      const result = await sendService.getRotatedKeys(newUserKey);

      expect(result).toEqual([]);
    });

    it("throws if the new user key is null", async () => {
      await expect(sendService.getRotatedKeys(null)).rejects.toThrowError(
        "New user key is required for rotation.",
      );
    });
  });

  // InternalSendService

  // it("upsert", async () => {
  //   await sendService.upsert(sendData("2", "Test 2"));

  //   expect(await firstValueFrom(sendService.sends$)).toEqual([
  //     send("1", "Test Send"),
  //     send("2", "Test 2"),
  //   ]);
  // });

  // it("replace", async () => {
  //   await sendService.replace({ "2": sendData("2", "test 2") });

  //   expect(await firstValueFrom(sendService.sends$)).toEqual([send("2", "test 2")]);
  // });

  // it("clear", async () => {
  //   await sendService.clear();

  //   expect(await firstValueFrom(sendService.sendViews)).toEqual([]);
  // });

  // describe("delete", () => {
  //   it("exists", async () => {
  //     await sendService.delete("1");

  //     expect(sendStateProvider.getEncryptedSends).toHaveBeenCalledTimes(2);
  //     expect(sendStateProvider.setEncryptedSends).toHaveBeenCalledTimes(1);
  //   });

  //   it("does not exist", async () => {
  //     // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
  //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //     sendService.delete("1");
  //     expect(sendStateProvider.getEncryptedSends).toHaveBeenCalledTimes(2);
  //   });
  // });ools/pm-5574-sends-state-provider

  // Send object helper functions

  function sendData(id: string, name: string) {
    const data = new SendData({} as any);
    data.id = id;
    data.name = name;
    data.disabled = false;
    data.accessCount = 2;
    data.accessId = "1";
    data.revisionDate = null;
    data.expirationDate = null;
    data.deletionDate = null;
    data.notes = "Notes!!";
    data.key = null;
    return data;
  }

  function sendView(id: string, name: string) {
    const data = new SendView({} as any);
    data.id = id;
    data.name = name;
    data.disabled = false;
    data.accessCount = 2;
    data.accessId = "1";
    data.revisionDate = null;
    data.expirationDate = null;
    data.deletionDate = null;
    data.notes = "Notes!!";
    data.key = null;
    return data;
  }

  function send(id: string, name: string) {
    const data = new Send({} as any);
    data.id = id;
    data.name = new EncString(name);
    data.disabled = false;
    data.accessCount = 2;
    data.accessId = "1";
    data.revisionDate = null;
    data.expirationDate = null;
    data.deletionDate = null;
    data.notes = new EncString("Notes!!");
    data.key = null;
    return data;
  }
});
