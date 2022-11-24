/* eslint-disable prettier/prettier */
import { GridView, LocalDataProvider } from "realgrid";
class RealGridCreate {
  constructor(gridData) {
    this.dataProvider = new LocalDataProvider(false);
    this.gridView = new GridView(document.getElementById(gridData.gridName));
    if (this.gridView) {
      this.gridView.setEditOptions({
        insertable: true,
        appendable: true,
        // commitWhenExitLast: true,
        editable: false,
        commitByCell: true,
        enterToTab: true,
        columnEditableFirst: true,
      });
      this.gridView.setDataSource(this.dataProvider);
      this.gridView.setColumns(gridData.columns);
      this.dataProvider.setFields(gridData.fields);

      this.vm = gridData.vm;

      if (gridData.existFavorite) {
        this.setFavoriteBtn();
      }

      if (gridData.existCalendar) {
        this.setCalendarBtn();
      }

      if (gridData.layout) {
        this.gridView.setColumnLayout(gridData.layout);
      }

      if (gridData.existAddr) {
        this.setImgBtn();
      }

      if (gridData.existFile) {
        this.setFileBtn();
      }

      let options = {
        display: {
          rowHeight: 32,
          columnResizable: true,
          // fitStyle: 'fill',
        },
        header: {
          height: 50,
        },
        stateBar: { visible: false },
        footers: { visible: false },
        rowIndicator: {
          visible: gridData.rowIndicator === "NO" ? false : true,
          width: 30,
        },
        checkBar: {
          visible: gridData.checkBarVisible === "NO" ? false : true,
          showAll: gridData.checkBarVisible === "NO" ? false : true,
          width: 30,
        },
      };
      // console.log(gridData);
      // console.log(options);

      this.gridView.setOptions(options);
      // console.log(this.gridView.getOptions());
      if (gridData.setFilter) {
        gridData.setFilter.forEach((filterNm) => {
          this.gridView.setColumnProperty(filterNm, "autoFilter", true);
        });
      }

      // this.gridView.displayOptions.syncGridHeight = 'always';
      this.gridView.displayOptions.fitStyle = "even";
      this.fnEditRowChanged();
      this.fnItemChecked();
      this.gridView.checkBar.syncHeadCheck = true;
      if (gridData.checkBarVisible !== "NO") this.fnItemAllChecked();

      const columnNames = this.gridView.getColumnNames(true, false);
      // const rv = this;
      this.gridView.setRowStyleCallback(function (grid, item, fixed) {
        fixed;
        let orderYn = "";
        let price = undefined;
        let offrStat = "";
        columnNames.forEach((name) => {
          // if (name === 'prdtClsCd') {
          //   prdtClsCd = grid.getValue(item.index, 'prdtClsCd');
          // } else
          if (name === "priceStat") {
            price = grid.getValue(item.index, "priceStat");
          } else if (name === "reqQtyPrice") {
            price = grid.getValue(item.index, "reqQtyPrice");
          } else if (name === "offrDtlsStatNm") {
            offrStat = grid.getValue(item.index, "offrDtlsStatNm");
          } else if (name == "offrStatNm") {
            offrStat = grid.getValue(item.index, "offrStatNm");
          } else if (name === "orderYn") {
            orderYn = grid.getValue(item.index, "orderYn");
          }
        });

        if (offrStat == "완료") {
          // console.log('진행상태가 완료면 색변경');
          return "rg-prdt-disble";
        }

        if (price && price.disbleYn === "Y") {
          return "rg-prdt-disble";
        }

        if (orderYn === "N") {
          return "rg-prdt-disble";
        }
        // else if (prdtClsCd == 'MFB') {
        //   return 'rg-mfb';
        // }
      });
      columnNames.forEach((name) => {
        if (name === "orderYn") {
          this.gridView.setCheckableExpression("values['orderYn'] = 'Y'", true);
        }
      });
    }
  }
  setFavoriteBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer("favoriteImgbtn", {
      initContent: function (parent) {
        var span = (this._span = document.createElement("span"));
        span.className = "custom_render_span";
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement("span")));
        parent.appendChild((this._button2 = document.createElement("span")));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        // console.log('DISPOSED......');
        parent.innerHTML = "";
      },

      render: function (grid, model) {
        // info = info || {};
        var span = this._span;
        // text설정.
        span.textContent = model.value;

        this._value = model.value;
        this._button1.className = "";
        switch (model.value) {
          case "Y":
            this._button1.className = "custom_search";
            break;
          case "N":
            this._button1.className = "custom_search2";
            break;
        }
      },

      click: function (event) {
        // var grid = this.grid.handler; //
        var index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1) {
          if (this._button1.className === "custom_search") {
            this._button1.className = "custom_search2";
            vm.changeFavoriteUseYn(index.dataRow);
          } else {
            this._button1.className = "custom_search";
            vm.changeFavoriteUseYn(index.dataRow);
          }
        }
      },
    });
  }

  setCalendarBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer("calendarImgbtn", {
      initContent: function (parent) {
        var span = (this._span = document.createElement("input"));
        span.className = "caleandar_render_span";
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement("span")));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        console.log("DISPOSED......");
        parent.innerHTML = "";
      },

      render: function (grid, model) {
        // info = info || {};
        var span = this._span;
        // text설정.
        if (model.value) {
          span.value = model.value;
        }

        this._value = model.value;
        this._button1.className = "rg_caleandar_btn";
      },

      click: function (event) {
        // var grid = this.grid.handler; //
        var index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1 || event.target === this._span) {
          vm.openCalendar(index.dataRow);
        }
      },
    });
  }

  fnEditRowChanged() {
    // const vm = this.vm;
    this.gridView.onEditRowChanged = (
      grid,
      itemIndex,
      dataRow,
      field,
      oldValue,
      newValue
    ) => {
      //var v = grid.getValue(itemIndex, field);
      this.vm.onEditRowChanged(
        grid,
        itemIndex,
        dataRow,
        field,
        oldValue,
        newValue
      );
    };
  }

  fnItemChecked() {
    const vm = this.vm;
    this.gridView.onItemChecked = function (grid, itemIndex, checked) {
      vm.onItemChecked(grid, itemIndex, checked);
    };
  }

  fnItemAllChecked() {
    const vm = this.vm;
    this.gridView.onItemAllChecked = function (grid, checked) {
      vm.onItemAllChecked(grid, checked);
    };
  }

  setImgBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer("imgbtn", {
      initContent: function (parent) {
        var index = this.index.toProxy();
        var span = (this._span = document.createElement("span"));
        //padding-right: 15px;
        if (index.column.fieldName === "dfcEndTypeCd") {
          span.className = "caleandar_render_span";
        } else if (index.column.fieldName === "addrInfo") {
          span.className = "custom_render_span";
        } else if (index.column.fieldName === "custReqRemarkYn") {
          span.className = "custom_render_span";
        } else if (index.column.fieldName === "salesResultCommt") {
          span.className = "custom_render_span";
        } else if (index.column.fieldName === "salesMngRemarkYn") {
          span.className = "custom_render_span";
        } else if (index.column.fieldName === "custReqRemark") {
          span.className = "custom_render_span";
        }
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement("span")));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        console.log("DISPOSED......");
        parent.innerHTML = "";
      },

      render: function (grid, model) {
        // info = info || {};
        var index = this.index.toProxy();
        var span = this._span;
        // text설정.
        span.textContent = model.value;

        this._value = model.value;

        this._button1.className = "";
        if (index.column.fieldName === "dfcEndTypeCd") {
          if (this._value) {
            this._button1.className = "end_read";
          } else {
            this._button1.className = "";
          }
        } else if (index.column.fieldName === "addrInfo") {
          this._button1.className = "addrInfo_read";
        } else if (index.column.fieldName === "custReqRemarkYn") {
          this._button1.className = "addrInfo_read";
          if (this._value == "N") {
            this._button1.className = "";
          } else {
            this._button1.className = "addrInfo_read";
          }
        } else if (index.column.fieldName === "salesResultCommt") {
          if (this._value == "N") {
            this._button1.className = "";
          } else {
            this._button1.className = "addrInfo_read";
          }
        } else if (index.column.fieldName === "custReqRemark") {
          this._button1.className = "addrInfo_read";
        } else if (index.column.fieldName === "salesMngRemarkYn") {
          if (this._value === "N") {
            this._button1.className = "pen_read";
          } else {
            this._button1.className = "addrInfo_read";
          }
        }
        // this._button1.className = 'addrInfo_read';
      },

      click: function (event) {
        // var grid = this.grid.handler; //
        var index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1) {
          if (index.column.fieldName === "dfcEndTypeCd") {
            if (this._value) {
              vm.openAddrInfo(index);
            }
          } else if (index.column.fieldName === "addrInfo") {
            vm.openAddrInfo(index);
          } else if (index.column.fieldName === "custReqRemarkYn") {
            vm.openAddrInfo(index);
          } else if (index.column.fieldName === "salesMngRemarkYn") {
            // vm.openSalesMemo(index);
          }
        } else {
          vm.openAddrInfo(index);
        }
      },
    });
  }
  setFileBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer("fileImgbtn", {
      initContent: function (parent) {
        // var span = (this._span = document.createElement('span'));
        // span.className = 'file_render_span';
        // parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement("span")));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = "";
      },

      render: function (grid, model) {
        // info = info || {};
        model;
        if (model.value === "Y") {
          this._button1.className = "rg_file_btn";
        }
      },

      click: function (event) {
        // var grid = this.grid.handler; //
        var index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1 || event.target === this._span) {
          vm.fileDownload(index.dataRow);
        }
      },
    });
  }
}
export default RealGridCreate;
