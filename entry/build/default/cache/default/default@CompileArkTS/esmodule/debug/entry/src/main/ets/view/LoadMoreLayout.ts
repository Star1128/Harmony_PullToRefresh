interface LoadMoreLayout_Params {
    loadMoreLayoutClass?: CustomRefreshLoadLayoutClass;
}
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/model/NewsData";
export default class LoadMoreLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__loadMoreLayoutClass = new SynchedPropertyNesedObjectPU(params.loadMoreLayoutClass, this, "loadMoreLayoutClass");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: LoadMoreLayout_Params) {
        this.__loadMoreLayoutClass.set(params.loadMoreLayoutClass);
    }
    updateStateVars(params: LoadMoreLayout_Params) {
        this.__loadMoreLayoutClass.set(params.loadMoreLayoutClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__loadMoreLayoutClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__loadMoreLayoutClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __loadMoreLayoutClass: SynchedPropertyNesedObjectPU<CustomRefreshLoadLayoutClass>;
    get loadMoreLayoutClass() {
        return this.__loadMoreLayoutClass.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loadMoreLayoutClass.isVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/LoadMoreLayout.ets", line: 29 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue)
                                });
                            }
                        }, { name: "CustomRefreshLoadLayout" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, 0)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/LoadMoreLayout.ets", line: 34 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, 0)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, 0)
                                });
                            }
                        }, { name: "CustomRefreshLoadLayout" });
                    }
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
