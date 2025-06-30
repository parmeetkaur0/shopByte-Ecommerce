import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const isFormValid = () =>
    Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every(Boolean);

  const handleManageAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          setShowForm(false);
          toast({ title: "Address updated successfully" });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
          setShowForm(false);
          toast({ title: "Address added successfully" });
        }
      });
    }
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "Address deleted successfully" });
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
    setShowForm(true);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {addressList?.map((address) => (
            <AddressCard
              key={address._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={address}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))}

          {/* Add New Address Card */}
          {addressList?.length < 3 && (
            <div className="flex justify-center items-center border border-dashed border-gray-300 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => {
                setFormData(initialAddressFormData);
                setCurrentEditedId(null);
                setShowForm(true);
              }}>
              <div className="flex flex-col items-center text-gray-600">
                <PlusCircle className="w-8 h-8 mb-1" />
                <span className="font-medium">Add New Address</span>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">
              {currentEditedId ? "Edit Address" : "Add New Address"}
            </h3>
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
            <div className="mt-2 text-right">
              <Button variant="ghost" size="sm" onClick={() => {
                setShowForm(false);
                setCurrentEditedId(null);
                setFormData(initialAddressFormData);
              }}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Address;
