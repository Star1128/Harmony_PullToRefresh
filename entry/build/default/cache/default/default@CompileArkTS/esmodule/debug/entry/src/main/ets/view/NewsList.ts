interface NewsList_Params {
    newsModel?: NewsModel;
    currentIndex?: number;
}
import promptAction from "@ohos:promptAction";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { PageState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import NewsItem from "@bundle:com.example.newsdataarkts/entry/ets/view/NewsItem";
import LoadMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/LoadMoreLayout";
import RefreshLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/RefreshLayout";
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/model/NewsData";
import type { NewsData } from "@bundle:com.example.newsdataarkts/entry/ets/model/NewsData";
import { listTouchEvent } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullDownRefresh";
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
import NoMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/NoMoreLayout";
import NewsModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsModel";
export default class NewsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__newsModel = new ObservedPropertyObjectPU(new NewsModel(), this, "newsModel");
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentIndex", this.changeCategory);
    }
    setInitiallyProvidedValue(params: NewsList_Params) {
        if (params.newsModel !== undefined) {
            this.newsModel = params.newsModel;
        }
    }
    updateStateVars(params: NewsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsModel.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsModel.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __newsModel: ObservedPropertyObjectPU<NewsModel>;
    get newsModel() {
        return this.__newsModel.get();
    }
    set newsModel(newValue: NewsModel) {
        this.__newsModel.set(newValue);
    }
    private __currentIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    changeCategory() {
        this.newsModel.currentPage = 1;
        NewsViewModel.getNewsList(this.newsModel.currentPage, this.newsModel.pageSize, Const.GET_NEWS_LIST)
            .then((data: NewsData[]) => {
            this.newsModel.pageState = 1;
            if (data.length === this.newsModel.pageSize) {
                this.newsModel.currentPage++;
                this.newsModel.hasMore = true;
            }
            else {
                this.newsModel.hasMore = false;
            }
            this.newsModel.newsData = data;
        })
            .catch((err: string | Resource) => {
            promptAction.showToast({
                message: err,
                duration: Const.ANIMATION_DURATION
            });
            this.newsModel.pageState = 2;
        });
    }
    aboutToAppear() {
        // Request news data.
        this.changeCategory();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
            Column.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    if (this.newsModel.pageState === 1) {
                        listTouchEvent(this.newsModel, event);
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.newsModel.pageState === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ListLayout.bind(this)();
                });
            }
            else if (this.newsModel.pageState === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.LoadingLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.FailLayout.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    LoadingLayout(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 89 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight)
                    });
                }
            }, { name: "CustomRefreshLoadLayout" });
        }
    }
    ListLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(Const.NewsListConstant_LIST_WIDTH);
            List.height(Const.FULL_HEIGHT);
            List.margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT });
            List.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            List.divider({
                color: { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" },
                strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
                endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
            });
            List.edgeEffect(EdgeEffect.None);
            List.offset({ x: 0, y: `${this.newsModel.offsetY}px` });
            List.onScrollIndex((start: number, end: number) => {
                // Listen to the first index of the current list.
                this.newsModel.startIndex = start;
                this.newsModel.endIndex = end;
            });
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RefreshLayout(this, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 96 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            });
                        }
                    }, { name: "RefreshLayout" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.height(Const.NewsListConstant_ITEM_HEIGHT);
                        ListItem.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                        ListItem.margin({ top: Const.NewsListConstant_ITEM_MARGIN_TOP });
                        ListItem.borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsItem(this, { newsData: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 104 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            newsData: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsModel.newsData, forEachItemGenFunction, (item: NewsData, index?: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.newsModel.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LoadMoreLayout(this, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 114 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        });
                                    }
                                }, { name: "LoadMoreLayout" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NoMoreLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 119 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "NoMoreLayout" });
                            }
                        });
                    }
                }, If);
                If.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
    }
    FailLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.height(Const.NewsListConstant_NONE_IMAGE_SIZE);
            Image.width(Const.NewsListConstant_NONE_IMAGE_SIZE);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.opacity(Const.NewsListConstant_NONE_TEXT_opacity);
            Text.fontSize(Const.NewsListConstant_NONE_TEXT_size);
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.margin({ top: Const.NewsListConstant_NONE_TEXT_margin });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
