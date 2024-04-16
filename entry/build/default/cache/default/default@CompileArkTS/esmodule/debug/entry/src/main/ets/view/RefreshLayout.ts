interface RefreshLayout_Params {
    refreshLayoutClass?: CustomRefreshLoadLayoutClass;
}
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/model/NewsData";
export default class RefreshLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__refreshLayoutClass = new SynchedPropertyNesedObjectPU(params.refreshLayoutClass, this, "refreshLayoutClass");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: RefreshLayout_Params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
    }
    updateStateVars(params: RefreshLayout_Params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__refreshLayoutClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__refreshLayoutClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __refreshLayoutClass: SynchedPropertyNesedObjectPU<CustomRefreshLoadLayoutClass>;
    get refreshLayoutClass() {
        return this.__refreshLayoutClass.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.refreshLayoutClass.isVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/RefreshLayout.ets", line: 29 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue)
                                });
                            }
                        }, { name: "CustomRefreshLoadLayout" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
