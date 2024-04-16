import promptAction from "@ohos:promptAction";
import { touchMoveLoadMore, touchUpLoadMore } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullUpLoadMore";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { RefreshState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
import type { NewsData } from '../../model/NewsData';
import type NewsModel from '../../viewmodel/NewsModel';
export function listTouchEvent(that: NewsModel, event: TouchEvent) {
    switch (event.type) {
        case TouchType.Down:
            that.downY = event.touches[0].y;
            that.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Move:
            if ((that.isRefreshing === true) || (that.isLoading === true)) {
                return;
            }
            let isDownPull = event.touches[0].y - that.lastMoveY > 0;
            if (((isDownPull === true) || (that.isPullRefreshOperation === true)) && (that.isCanLoadMore === false)) {
                // Finger movement, processing pull-down refresh.
                touchMovePullRefresh(that, event);
            }
            else {
                // Finger movement, processing load more.
                touchMoveLoadMore(that, event);
            }
            that.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Cancel:
            break;
        case TouchType.Up:
            if ((that.isRefreshing === true) || (that.isLoading === true)) {
                return;
            }
            if ((that.isPullRefreshOperation === true)) {
                // Lift your finger and pull down to refresh.
                touchUpPullRefresh(that);
            }
            else {
                // Fingers up, handle loading more.
                touchUpLoadMore(that);
            }
            break;
        default:
            break;
    }
}
export function touchMovePullRefresh(that: NewsModel, event: TouchEvent) {
    if (that.startIndex === 0) {
        that.isPullRefreshOperation = true;
        let height = vp2px(that.pullDownRefreshHeight);
        that.offsetY = event.touches[0].y - that.downY;
        // The sliding offset is greater than the pull-down refresh layout height, and the refresh condition is met.
        if (that.offsetY >= height) {
            pullRefreshState(that, 1);
            that.offsetY = height + that.offsetY * Const.Y_OFF_SET_COEFFICIENT;
        }
        else {
            pullRefreshState(that, 0);
        }
        if (that.offsetY < 0) {
            that.offsetY = 0;
            that.isPullRefreshOperation = false;
        }
    }
}
export function touchUpPullRefresh(that: NewsModel) {
    if (that.isCanRefresh === true) {
        that.offsetY = vp2px(that.pullDownRefreshHeight);
        pullRefreshState(that, 2);
        that.currentPage = 1;
        setTimeout(() => {
            let self = that;
            NewsViewModel.getNewsList(that.currentPage, that.pageSize, Const.GET_NEWS_LIST).then((data: NewsData[]) => {
                if (data.length === that.pageSize) {
                    self.hasMore = true;
                    self.currentPage++;
                }
                else {
                    self.hasMore = false;
                }
                self.newsData = data;
                closeRefresh(self, true);
            }).catch((err: string | Resource) => {
                promptAction.showToast({ message: err });
                // closeRefresh.call(self, false);
                closeRefresh(self, false);
            });
        }, Const.DELAY_TIME);
    }
    else {
        closeRefresh(that, false);
    }
}
export function pullRefreshState(that: NewsModel, state: number) {
    switch (state) {
        case 0:
            that.pullDownRefreshText = { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.pullDownRefreshImage = { "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.isCanRefresh = false;
            that.isRefreshing = false;
            that.isVisiblePullDown = true;
            break;
        case 1:
            that.pullDownRefreshText = { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.pullDownRefreshImage = { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.isCanRefresh = true;
            that.isRefreshing = false;
            break;
        case 2:
            that.offsetY = vp2px(that.pullDownRefreshHeight);
            that.pullDownRefreshText = { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.pullDownRefreshImage = { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.isCanRefresh = true;
            that.isRefreshing = true;
            break;
        case 3:
            that.pullDownRefreshText = { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.pullDownRefreshImage = { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.isCanRefresh = true;
            that.isRefreshing = true;
            break;
        case 4:
            that.pullDownRefreshText = { "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.pullDownRefreshImage = { "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            that.isCanRefresh = true;
            that.isRefreshing = true;
            break;
        default:
            break;
    }
}
export function closeRefresh(that: NewsModel, isRefreshSuccess: boolean) {
    let self = that;
    setTimeout(() => {
        let delay = Const.RefreshConstant_DELAY_PULL_DOWN_REFRESH;
        if (self.isCanRefresh === true) {
            pullRefreshState(that, isRefreshSuccess ? 3 : 4);
            delay = Const.RefreshConstant_DELAY_SHRINK_ANIMATION_TIME;
        }
        Context.animateTo({
            duration: Const.RefreshConstant_CLOSE_PULL_DOWN_REFRESH_TIME,
            delay: delay,
            onFinish: () => {
                pullRefreshState(that, 0);
                self.isVisiblePullDown = false;
                self.isPullRefreshOperation = false;
            }
        }, () => {
            self.offsetY = 0;
        });
    }, self.isCanRefresh ? Const.DELAY_ANIMATION_DURATION : 0);
}
